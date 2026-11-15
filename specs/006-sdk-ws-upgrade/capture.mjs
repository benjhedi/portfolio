// Spec 006 AC-5 evidence: computed styles and full-page screenshots of the
// built site, light and dark, at 1440 and 390, and a diff of two captures.
// No dependency: Node 22 global WebSocket, system Chrome over the DevTools
// protocol (same approach as docs/v2/export-screens.mjs).
// Usage, with `npm run preview` serving the site:
//   node specs/006-sdk-ws-upgrade/capture.mjs capture <outDir> [url]
//   node specs/006-sdk-ws-upgrade/capture.mjs diff <dirA> <dirB>
// Reduced motion is emulated so the page renders its static version.

import { spawn } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { inflateSync } from 'node:zlib';

const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const VIEWPORTS = [
  { name: '1440', width: 1440, height: 900, scale: 1 },
  { name: '390', width: 390, height: 844, scale: 2 },
];
const THEMES = ['light', 'dark'];
const CONTROL_PROPS = [
  'color', 'background-color', 'background-image', 'border-top-color', 'border-top-width',
  'border-top-style', 'border-top-left-radius', 'box-shadow', 'font-family', 'font-size',
  'font-weight', 'line-height', 'letter-spacing', 'padding-top', 'padding-left', 'height',
  'outline-color', 'opacity',
];

// Runs in the page: every custom property the site declares (SDK names
// excluded, they are what changes), resolved on <html>, plus the contact
// controls' computed styles.
const COLLECT = `(() => {
  const names = new Set();
  const walk = (rules) => { for (const r of rules) {
    if (r.style) for (const p of r.style) if (p.startsWith('--') && !/^--(tw|ws|wara)-/.test(p)) names.add(p);
    if (r.cssRules) walk(r.cssRules);
  } };
  for (const s of document.styleSheets) { try { walk(s.cssRules); } catch {} }
  const root = getComputedStyle(document.documentElement);
  const vars = {};
  for (const n of [...names].sort()) vars[n] = root.getPropertyValue(n).trim();
  const controls = {};
  document.querySelectorAll('#contact input, #contact textarea, #contact button').forEach((el, i) => {
    const c = getComputedStyle(el);
    const key = i + ':' + el.tagName.toLowerCase() + (el.name ? '[' + el.name + ']' : '') + (el.type ? ':' + el.type : '');
    controls[key] = Object.fromEntries(${JSON.stringify(CONTROL_PROPS)}.map((p) => [p, c.getPropertyValue(p)]));
  });
  return { theme: document.documentElement.dataset.theme ?? 'light', vars, controls };
})()`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function startChrome(profileDir) {
  const chrome = spawn(CHROME, ['--headless=new', '--hide-scrollbars', '--remote-debugging-port=0',
    `--user-data-dir=${profileDir}`, '--no-first-run', '--no-default-browser-check', 'about:blank']);
  const url = await new Promise((res, rej) => {
    const timer = setTimeout(() => rej(new Error('Chrome did not start')), 20000);
    let err = '';
    chrome.on('error', (e) => { clearTimeout(timer); rej(e); });
    chrome.stderr.on('data', (d) => {
      err += d;
      const m = err.match(/DevTools listening on (ws:\/\/\S+)/);
      if (m) { clearTimeout(timer); res(m[1]); }
    });
  });
  return { chrome, url };
}

function connect(url) {
  const ws = new WebSocket(url);
  let id = 0;
  const pending = new Map();
  const waiters = [];
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { res, rej } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? rej(new Error(JSON.stringify(msg.error))) : res(msg.result);
    } else if (msg.method) {
      for (const w of [...waiters]) if (w.method === msg.method && w.sessionId === msg.sessionId) {
        waiters.splice(waiters.indexOf(w), 1);
        w.res(msg.params);
      }
    }
  };
  const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
    pending.set(++id, { res, rej });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });
  const once = (method, sessionId) => new Promise((res) => waiters.push({ method, sessionId, res }));
  return new Promise((res) => { ws.onopen = () => res({ ws, send, once }); });
}

async function capturePage(cdp, url, viewport, theme, outDir) {
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  const s = (m, p) => cdp.send(m, p, sessionId);
  await s('Page.enable');
  await s('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await s('Emulation.setDeviceMetricsOverride', { width: viewport.width, height: viewport.height, deviceScaleFactor: viewport.scale, mobile: false });
  await s('Page.addScriptToEvaluateOnNewDocument', { source: `localStorage.setItem('theme','${theme}');localStorage.setItem('locale','fr');` });
  const loaded = cdp.once('Page.loadEventFired', sessionId);
  await s('Page.navigate', { url });
  await loaded;
  const evaluate = async (expression) => (await s('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result.value;
  await evaluate('document.fonts.ready.then(() => true)');
  // Walk the page once so lazy images and in-view reveals settle, then back to top.
  await evaluate(`(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } scrollTo(0, 0); return true; })()`);
  await sleep(1500);
  const data = await evaluate(COLLECT);
  const height = await evaluate('document.documentElement.scrollHeight');
  const { data: png } = await s('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: viewport.width, height, scale: 1 } });
  writeFileSync(join(outDir, `${viewport.name}-${theme}.png`), Buffer.from(png, 'base64'));
  await cdp.send('Target.closeTarget', { targetId });
  return data;
}

async function capture(outDir, url = 'http://localhost:8787/') {
  mkdirSync(outDir, { recursive: true });
  const profile = mkdtempSync(join(tmpdir(), 'capture006-'));
  const { chrome, url: wsUrl } = await startChrome(profile);
  const cdp = await connect(wsUrl);
  const computed = {};
  try {
    for (const viewport of VIEWPORTS) for (const theme of THEMES) {
      const data = await capturePage(cdp, url, viewport, theme, outDir);
      if (data.theme !== theme) throw new Error(`asked ${theme}, page shows ${data.theme}`);
      if (viewport.name === '1440') computed[theme] = { vars: data.vars, controls: data.controls };
      console.log(`${viewport.name}-${theme}: ${Object.keys(data.vars).length} vars, ${Object.keys(data.controls).length} controls`);
    }
  } finally {
    cdp.ws.close();
    chrome.kill();
    await sleep(500);
    rmSync(profile, { recursive: true, force: true });
  }
  writeFileSync(join(outDir, 'computed.json'), JSON.stringify(computed, null, 2) + '\n');
}

// Minimal PNG decoder: 8-bit RGB or RGBA, non-interlaced (Chrome's output).
function decodePng(buf) {
  let pos = 8, width, height, channels;
  const idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos), type = buf.toString('ascii', pos + 4, pos + 8), body = buf.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') {
      width = body.readUInt32BE(0); height = body.readUInt32BE(4);
      if (body[8] !== 8 || body[12] !== 0) throw new Error('unsupported PNG');
      channels = { 2: 3, 6: 4 }[body[9]];
      if (!channels) throw new Error(`unsupported color type ${body[9]}`);
    } else if (type === 'IDAT') idat.push(body);
    pos += 12 + len;
  }
  const raw = inflateSync(Buffer.concat(idat));
  const stride = width * channels, out = Buffer.alloc(height * stride);
  for (let y = 0; y < height; y++) {
    const f = raw[y * (stride + 1)], line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    for (let x = 0; x < stride; x++) {
      const a = x >= channels ? out[y * stride + x - channels] : 0, b = y ? out[(y - 1) * stride + x] : 0;
      const c = x >= channels && y ? out[(y - 1) * stride + x - channels] : 0;
      const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
      const pred = [0, a, b, (a + b) >> 1, pa <= pb && pa <= pc ? a : pb <= pc ? b : c][f];
      out[y * stride + x] = (line[x] + pred) & 255;
    }
  }
  return { width, height, channels, pixels: out };
}

function diff(dirA, dirB) {
  let failures = 0;
  const flat = (o, p = '') => Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? flat(v, `${p}${k}.`) : [[`${p}${k}`, v]]));
  const a = new Map(flat(JSON.parse(readFileSync(join(dirA, 'computed.json'), 'utf8'))));
  const b = new Map(flat(JSON.parse(readFileSync(join(dirB, 'computed.json'), 'utf8'))));
  const keys = new Set([...a.keys(), ...b.keys()]);
  const changed = [...keys].filter((k) => a.get(k) !== b.get(k));
  for (const k of changed) console.log(`DIFF ${k}: ${JSON.stringify(a.get(k))} -> ${JSON.stringify(b.get(k))}`);
  console.log(`computed.json: ${keys.size} values compared, ${changed.length} differ`);
  failures += changed.length;
  for (const file of readdirSync(dirA).filter((f) => f.endsWith('.png')).sort()) {
    const pa = decodePng(readFileSync(join(dirA, file))), pb = decodePng(readFileSync(join(dirB, file)));
    if (pa.width !== pb.width || pa.height !== pb.height) {
      console.log(`${file}: size ${pa.width}x${pa.height} -> ${pb.width}x${pb.height}`);
      failures++;
      continue;
    }
    let n = 0;
    for (let i = 0; i < pa.width * pa.height; i++) {
      for (let ch = 0; ch < 3; ch++) if (pa.pixels[i * pa.channels + ch] !== pb.pixels[i * pb.channels + ch]) { n++; break; }
    }
    console.log(`${file}: ${pa.width}x${pa.height}, ${n} pixels differ`);
    if (n) failures++;
  }
  process.exitCode = failures ? 1 : 0;
}

const [mode, x, y] = process.argv.slice(2);
if (mode === 'capture') await capture(x, y);
else if (mode === 'diff') diff(x, y);
else { console.error('usage: capture <outDir> [url] | diff <dirA> <dirB>'); process.exitCode = 2; }
