// Exports the v2 mockup screens listed in the png block of README.md.
// Usage, from the repo root: node docs/v2/export-screens.mjs [outDir]
// No dependency: Node 22 global WebSocket and fetch, system Chrome over the
// DevTools protocol, python3 http.server. Procedure: README "Export the screens".
import { spawn } from 'node:child_process';
import { mkdirSync, mkdtempSync, openSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(process.argv[2] ?? join(HERE, 'ecrans'));
const PORT = 8765;
const ORIGIN = `http://127.0.0.1:${PORT}`;
const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

// The frozen moment of spec 004 (AC-4, D1).
const VIDEO_T = 3.56; // inside the first loop, the video lasts 4.209 s
const RIDE_T = 1512; // 0.72 x 2100 ms: the emerge keyframe where the app peaks
const LINE_T = 1100; // half of the 2.2 s scroll hint cycle: line fully drawn
const MQ_T = 0;
// Past this many device pixels a single capture repeats content (probe 2026-11-09).
const MAX_DEVICE_PX = 16384;
const TILE_CSS = 8000;
const FONTS = ['400 16px "Hanken Grotesk"', '480 16px "Hanken Grotesk"', '600 16px "Hanken Grotesk"', '400 16px "JetBrains Mono"', '500 16px "JetBrains Mono"'];

// Page order: the index is the file prefix.
const SCREENS = {
  preloader: '#loader', hero: 'section.hero', statement: '.statement', clients: '.clients',
  projects: '.work', about: '.about', offers: '.offers', process: '.process', career: '.career',
  skills: '.skills', contact: '.contact', footer: 'footer.footer',
};
const ORDER = Object.keys(SCREENS);

const children = [];
let profileDir;
let logFile;

function fail(message) {
  throw new Error(message);
}

function killAll() {
  for (const child of children) {
    if (child.exitCode === null && child.signalCode === null) {
      // Negative pid: the whole group, so Chrome renderers and GPU go too.
      try { process.kill(-child.pid, 'SIGKILL'); } catch {}
    }
  }
  if (profileDir) rmSync(profileDir, { recursive: true, force: true });
}
process.on('exit', killAll);
for (const signal of ['SIGINT', 'SIGTERM', 'SIGHUP']) {
  process.on(signal, () => {
    console.error(`export-screens: ${signal}, stopping`);
    process.exit(1);
  });
}

// ---------------------------------------------------------------- names

function readNames() {
  const lines = readFileSync(join(HERE, 'README.md'), 'utf8').split('\n');
  const start = lines.indexOf('```png');
  const end = lines.indexOf('```', start + 1);
  if (start < 0 || end < 0) fail('README.md has no png block');
  const names = lines.slice(start + 1, end);
  if (new Set(names).size !== names.length) fail('README.md png block holds a duplicate name');
  return names.map(parseName);
}

function parseName(name) {
  const m = /^(\d\d)-([a-z]+)(-reduced)?(-mobile)?(-dark)?\.png$/.exec(name);
  const screen = m?.[2];
  const known = m && Object.hasOwn(SCREENS, screen) && String(ORDER.indexOf(screen)).padStart(2, '0') === m[1];
  // Reduced motion is captured for the hero only; the preloader does not exist under it.
  if (!known || (m[3] && screen !== 'hero')) fail(`cannot map ${JSON.stringify(name)} to a screen`);
  return { name, screen, reduced: Boolean(m[3]), mobile: Boolean(m[4]), dark: Boolean(m[5]) };
}

// ---------------------------------------------------------------- processes

async function isServed() {
  try {
    await fetch(`${ORIGIN}/`, { signal: AbortSignal.timeout(1000) });
    return true;
  } catch {
    return false;
  }
}

async function startServer(workDir) {
  // A server already on the port would be captured instead of the mockup.
  if (await isServed()) fail(`port ${PORT} is already in use`);
  logFile = join(workDir, 'http-server.log');
  const log = openSync(logFile, 'a');
  const server = spawn('python3', ['-m', 'http.server', String(PORT), '--bind', '127.0.0.1', '--directory', join(HERE, 'mockup')],
    { detached: true, stdio: ['ignore', log, log] });
  children.push(server);
  const started = Date.now();
  while (!(await isServed())) {
    if (server.exitCode !== null) fail(`python3 http.server exited (${server.exitCode}), see ${logFile}`);
    if (Date.now() - started > 10000) fail(`python3 http.server not ready after 10 s, see ${logFile}`);
    await new Promise((r) => setTimeout(r, 100));
  }
  return server;
}

function startChrome(workDir) {
  profileDir = join(workDir, 'chrome-profile');
  const chrome = spawn(CHROME, [
    '--headless=new', '--hide-scrollbars', '--remote-debugging-port=0', `--user-data-dir=${profileDir}`,
    '--no-first-run', '--no-default-browser-check', '--mute-audio',
    // Same colors on any machine, whatever the display profile.
    '--force-color-profile=srgb',
    'about:blank',
  ], { detached: true, stdio: ['ignore', 'ignore', 'pipe'] });
  children.push(chrome);
  return new Promise((res, rej) => {
    let err = '';
    const timer = setTimeout(() => rej(new Error('Chrome did not open DevTools within 15 s')), 15000);
    chrome.on('error', (e) => { clearTimeout(timer); rej(new Error(`cannot start Chrome at ${CHROME}: ${e.message}`)); });
    chrome.on('exit', (code) => { clearTimeout(timer); rej(new Error(`Chrome exited (${code}): ${err.slice(-500)}`)); });
    chrome.stderr.on('data', (d) => {
      err += d;
      const m = /DevTools listening on (ws:\/\/\S+)/.exec(err);
      if (m) { clearTimeout(timer); res({ chrome, url: m[1] }); }
    });
  });
}

function exited(child, ms) {
  if (child.exitCode !== null || child.signalCode !== null) return Promise.resolve();
  return new Promise((r) => { child.once('exit', r); setTimeout(r, ms); });
}

// ---------------------------------------------------------------- DevTools protocol

async function connect(url) {
  const ws = new WebSocket(url);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = () => rej(new Error('DevTools socket error')); });
  let id = 0;
  const pending = new Map();
  const listeners = new Set();
  ws.onmessage = (m) => {
    const msg = JSON.parse(m.data);
    if (msg.id && pending.has(msg.id)) {
      const { res, rej, method } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) rej(new Error(`${method}: ${msg.error.message}`));
      else res(msg.result);
    } else if (msg.method) {
      for (const l of listeners) l(msg);
    }
  };
  const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
    const i = ++id;
    const timer = setTimeout(() => { pending.delete(i); rej(new Error(`${method}: no answer in 60 s`)); }, 60000);
    pending.set(i, { method, res: (v) => { clearTimeout(timer); res(v); }, rej: (e) => { clearTimeout(timer); rej(e); } });
    ws.send(JSON.stringify({ id: i, method, params, sessionId }));
  });
  const once = (method, sessionId, ms) => new Promise((res, rej) => {
    const l = (msg) => { if (msg.method === method && msg.sessionId === sessionId) { listeners.delete(l); clearTimeout(timer); res(msg.params); } };
    const timer = setTimeout(() => { listeners.delete(l); rej(new Error(`${method}: not fired in ${ms} ms`)); }, ms);
    listeners.add(l);
  });
  return { send, once, close: () => ws.close() };
}

async function openTab(cdp) {
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  const send = (method, params) => cdp.send(method, params, sessionId);
  // Runs a page-side function with one JSON argument and returns its JSON result.
  const run = async (fn, arg) => {
    const r = await send('Runtime.evaluate', { expression: `(${fn})(${JSON.stringify(arg ?? null)})`, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) fail(`page: ${r.exceptionDetails.exception?.description ?? r.exceptionDetails.text}`);
    return r.result.value;
  };
  return { targetId, sessionId, send, run, close: () => cdp.send('Target.closeTarget', { targetId }) };
}

// ---------------------------------------------------------------- page side
// These functions are serialized into the page: no closure over Node values.

async function pagePrepare(o) {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const until = async (test, ms, what) => {
    const end = performance.now() + ms;
    while (!test()) { if (performance.now() > end) throw new Error(`timeout: ${what}`); await sleep(50); }
  };
  const errors = [];
  if (innerWidth !== o.w || (window.visualViewport?.scale ?? 1) !== 1) errors.push(`viewport ${innerWidth} px, scale ${visualViewport.scale}`);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches !== o.reduced) errors.push('reduced motion not emulated');
  if ((document.documentElement.getAttribute('data-theme') === 'dark') !== o.dark) errors.push('theme does not follow the emulated scheme');
  // Under reduced motion the page marks the loader done at once.
  await until(() => document.getElementById('loader').classList.contains('done'), 15000, 'preloader');
  await document.fonts.ready;
  for (const f of o.fonts) {
    try { if (!(await document.fonts.load(f)).length) errors.push(`font missing: ${f}`); } catch (e) { errors.push(`font failed: ${f}`); }
  }
  await Promise.all([...document.images].map((i) => i.decode().catch(() => errors.push(`image failed: ${i.getAttribute('src')}`))));
  const vid = document.getElementById('heroVideo');
  if (o.reduced) {
    const poster = new Image();
    poster.src = vid.poster;
    await poster.decode().catch(() => errors.push('hero poster failed'));
  } else {
    // networkState 3: no usable source, the LFS pointer case.
    await until(() => vid.readyState >= 2 || vid.networkState === 3, 15000, 'hero video data').catch((e) => errors.push(e.message));
    if (vid.readyState < 2 || !vid.videoWidth) errors.push('hero video frame missing (git lfs pull?)');
  }
  return { errors, scrollWidth: document.documentElement.scrollWidth };
}

async function pageFreeze(o) {
  const frames = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  document.querySelectorAll('.r, .big').forEach((e) => e.classList.add('in'));
  if (!o.reduced) {
    const vid = document.getElementById('heroVideo');
    vid.pause();
    // python3 http.server ignores Range requests, so Chrome reports the served
    // video as not seekable and a seek lands on 0. The same bytes from a blob
    // URL are seekable.
    const blob = await (await fetch(vid.currentSrc)).blob();
    const loaded = new Promise((r, j) => { vid.addEventListener('loadeddata', r, { once: true }); setTimeout(() => j(new Error('video reload timeout')), 10000); });
    vid.src = URL.createObjectURL(blob);
    await loaded;
    vid.pause();
    const seeked = new Promise((r, j) => { vid.addEventListener('seeked', r, { once: true }); setTimeout(() => j(new Error('video seek timeout')), 10000); });
    vid.currentTime = o.videoT;
    await seeked;
    // The seek fires timeupdate, and the page may have launched another object: reset them all.
    const outs = [...document.querySelectorAll('#vapor .out')];
    outs.forEach((e) => e.classList.remove('go'));
    outs[0].classList.add('go');
    const ride = outs[0].getAnimations().find((a) => a.animationName === 'emerge');
    if (!ride) throw new Error('no emerge animation on the first vapor object');
    ride.pause();
    ride.currentTime = o.rideT;
    for (const a of document.getAnimations()) {
      if (a.animationName === 'mq') { a.pause(); a.currentTime = o.mqT; }
      if (a.animationName === 'line') { a.pause(); a.currentTime = o.lineT; }
    }
  }
  for (const a of document.getAnimations()) if (a instanceof CSSTransition) a.finish();
  await frames();
}

function pageState() {
  const vid = document.getElementById('heroVideo');
  const outs = [...document.querySelectorAll('#vapor .out')];
  const anims = document.getAnimations();
  const ride = outs[0].getAnimations().find((a) => a.animationName === 'emerge');
  const line = anims.find((a) => a.animationName === 'line');
  const time = (a) => (a ? { t: Number(a.currentTime), state: a.playState } : null);
  const revealable = [...document.querySelectorAll('.r, .big')];
  const hiddenReveals = revealable.filter((e) => !e.classList.contains('in') || (e.classList.contains('r') && getComputedStyle(e).opacity !== '1'));
  const hiddenLines = [...document.querySelectorAll('.big .line > span')].filter((s) => getComputedStyle(s).transform !== 'none');
  return {
    video: vid.currentTime, videoPaused: vid.paused, played: vid.played.length,
    rideSrc: outs[0].querySelector('img')?.getAttribute('src'),
    ride: time(ride),
    otherGo: outs.slice(1).filter((e) => e.classList.contains('go')).length,
    mq: anims.filter((a) => a.animationName === 'mq').map(time),
    mqTracks: document.querySelectorAll('.marquee > div, .title-mq > div').length,
    line: time(line),
    running: anims.filter((a) => a.playState === 'running').map((a) => a.animationName ?? a.transitionProperty),
    unrevealed: hiddenReveals.length + hiddenLines.length,
  };
}

function pageRects(selectors) {
  return selectors.map((s) => {
    const e = document.querySelector(s);
    if (!e) return { sel: s, missing: true };
    const r = e.getBoundingClientRect();
    return { sel: s, y: r.top + scrollY, h: r.height, w: r.width };
  });
}

function pageHideChrome() {
  const style = document.createElement('style');
  // body > .bar: the vapor objects hold a .bar of their own.
  style.textContent = '#nav, body > .bar { visibility: hidden !important }';
  document.head.append(style);
}

async function pageRebuildPreloader() {
  const loader = document.getElementById('loader');
  loader.classList.remove('done');
  document.getElementById('pct').textContent = '0%';
  for (const a of loader.getAnimations()) a.finish();
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  const cs = getComputedStyle(loader);
  return { opacity: cs.opacity, visibility: cs.visibility, pct: document.getElementById('pct').textContent, mark: loader.querySelector('.mark').textContent };
}

async function pageStitch(o) {
  const canvas = document.createElement('canvas');
  canvas.width = o.w;
  canvas.height = o.h;
  const g = canvas.getContext('2d');
  for (const t of o.tiles) {
    const img = new Image();
    img.src = `data:image/png;base64,${t.data}`;
    await img.decode();
    g.drawImage(img, 0, t.y);
  }
  return canvas.toDataURL('image/png').split(',')[1];
}

// ---------------------------------------------------------------- checks

function drift(ctx, s) {
  const errors = [];
  const near = (a, b, eps) => Math.abs(a - b) <= eps;
  if (s.running.length) errors.push(`still running: ${s.running.join(', ')}`);
  if (s.unrevealed) errors.push(`${s.unrevealed} unrevealed`);
  if (s.otherGo) errors.push(`${s.otherGo} other vapor object(s) out`);
  if (!s.videoPaused) errors.push('video playing');
  if (ctx.reduced) {
    if (s.played || s.video !== 0) errors.push(`reduced: video moved to ${s.video}, poster lost`);
    if (s.ride || s.mq.length || s.line) errors.push('reduced: an animation exists');
  } else {
    if (!near(s.video, VIDEO_T, 0.01)) errors.push(`video at ${s.video}`);
    if (s.rideSrc !== 'img/RIDE.webp') errors.push(`first vapor object is ${s.rideSrc}`);
    if (!s.ride || s.ride.state !== 'paused' || !near(s.ride.t, RIDE_T, 0.5)) errors.push(`RIDE at ${JSON.stringify(s.ride)}`);
    if (s.mq.length !== s.mqTracks || s.mq.some((a) => a.state !== 'paused' || !near(a.t, MQ_T, 0.5))) errors.push(`marquees ${JSON.stringify(s.mq)} for ${s.mqTracks} tracks`);
    if (!s.line || s.line.state !== 'paused' || !near(s.line.t, LINE_T, 0.5)) errors.push(`scroll hint at ${JSON.stringify(s.line)}`);
  }
  return errors;
}

function flags(ctx, s) {
  const ms = (a) => (a ? String(Math.round(a.t)) : '-');
  const mqTimes = [...new Set(s.mq.map((a) => Math.round(a.t)))].join(',');
  return [
    `video=${s.video.toFixed(3)}${ctx.reduced ? ' poster' : ''}`,
    `ride=${ms(s.ride)}`,
    `otherGo=${s.otherGo}`,
    `mq=${s.mq.length ? `${mqTimes}x${s.mq.length}` : '-'}`,
    `line=${ms(s.line)}`,
    `unrevealed=${s.unrevealed}`,
  ].join(' ');
}

function pngSize(buf) {
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

function checkOrder(rects) {
  let bottom = 0;
  for (const r of rects) {
    if (r.missing) fail(`no element for ${r.sel}`);
    if (r.h <= 0) fail(`${r.sel} is empty`);
    if (r.y < bottom - 0.5) fail(`${r.sel} at y ${r.y} starts before the previous screen ends at ${bottom}`);
    bottom = r.y + r.h;
  }
  if (Math.abs(rects[0].y) > 0.5) fail(`the hero starts at y ${rects[0].y}`);
}

// ---------------------------------------------------------------- capture

async function capture(tab, clip) {
  const { data } = await tab.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { ...clip, scale: 1 } });
  return data;
}

async function frames(tab) {
  await tab.run(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
}

async function runContext(cdp, ctx, items, done) {
  const tab = await openTab(cdp);
  const stitches = [];
  try {
    await tab.send('Page.enable');
    await tab.send('Storage.clearDataForOrigin', { origin: ORIGIN, storageTypes: 'local_storage' });
    // mobile: false on purpose. The skills block overflows to 5151 px, and
    // mobile emulation then widens the layout viewport to 1560 px (Android
    // zoom-out limit), so the fixed nav, bar and preloader leave the 390 px frame.
    const metrics = (height) => tab.send('Emulation.setDeviceMetricsOverride', { width: ctx.w, height, deviceScaleFactor: ctx.dpr, mobile: false });
    await metrics(ctx.h);
    await tab.send('Emulation.setEmulatedMedia', { features: [
      { name: 'prefers-color-scheme', value: ctx.dark ? 'dark' : 'light' },
      { name: 'prefers-reduced-motion', value: ctx.reduced ? 'reduce' : 'no-preference' },
    ] });
    const loaded = cdp.once('Page.loadEventFired', tab.sessionId, 30000);
    await tab.send('Page.navigate', { url: `${ORIGIN}/` });
    await loaded;

    const prepared = await tab.run(pagePrepare, { w: ctx.w, dark: ctx.dark, reduced: ctx.reduced, fonts: FONTS });
    if (prepared.errors.length) fail(`${ctx.label}: ${prepared.errors.join('; ')}`);
    ctx.scrollWidth = prepared.scrollWidth;
    await tab.run(pageFreeze, { reduced: ctx.reduced, videoT: VIDEO_T, rideT: RIDE_T, mqT: MQ_T, lineT: LINE_T });

    const want = (screen) => items.find((i) => i.screen === screen);
    const check = async () => {
      const s = await tab.run(pageState);
      const errors = drift(ctx, s);
      if (errors.length) fail(`${ctx.label}: ${errors.join('; ')}`);
      return s;
    };
    const save = (item, data, css, extra = '') => {
      const buf = Buffer.from(data, 'base64');
      const size = pngSize(buf);
      if (size.w !== Math.round(css.w * ctx.dpr) || size.h !== Math.round(css.h * ctx.dpr)) fail(`${item.name}: PNG ${size.w}x${size.h}, expected ${css.w}x${css.h} at ${ctx.dpr}x`);
      writeFileSync(join(OUT, item.name), buf);
      done(item, `${css.w}x${css.h}${extra}`);
    };

    const hero = want('hero');
    if (hero) {
      // A viewport as tall as the hero puts the fixed nav and bar where a visitor sees them.
      const [before] = await tab.run(pageRects, [SCREENS.hero]);
      await metrics(Math.round(before.h));
      await frames(tab);
      const [after] = await tab.run(pageRects, [SCREENS.hero]);
      if (Math.abs(after.h - before.h) >= 1) fail(`${ctx.label}: hero height moved from ${before.h} to ${after.h} with the viewport`);
      const s = await check();
      const css = { w: ctx.w, h: Math.round(after.h) };
      save(hero, await capture(tab, { x: 0, y: 0, width: css.w, height: css.h }), css, ` ${flags(ctx, s)}`);
      await metrics(ctx.h);
      await frames(tab);
    }

    await tab.run(pageHideChrome);
    await frames(tab);
    const sections = ORDER.slice(1);
    const rects = await tab.run(pageRects, sections.map((k) => SCREENS[k]));
    checkOrder(rects);
    for (const [index, screen] of sections.entries()) {
      const item = want(screen);
      if (!item || screen === 'hero') continue;
      const r = rects[index];
      const css = { w: ctx.w, h: Math.round(r.y + r.h) - Math.round(r.y) };
      const top = Math.round(r.y);
      const s = await check();
      const tail = ` ${flags(ctx, s)}`;
      if (css.h * ctx.dpr <= MAX_DEVICE_PX) {
        save(item, await capture(tab, { x: 0, y: top, width: css.w, height: css.h }), css, tail);
        continue;
      }
      const tiles = [];
      for (let y = 0; y < css.h; y += TILE_CSS) {
        const height = Math.min(TILE_CSS, css.h - y);
        tiles.push({ y: y * ctx.dpr, data: await capture(tab, { x: 0, y: top + y, width: css.w, height }) });
      }
      stitches.push({ item, css, tiles, tail: `${tail} tiles=${tiles.length}` });
    }

    const pre = want('preloader');
    if (pre) {
      const p = await tab.run(pageRebuildPreloader);
      if (p.opacity !== '1' || p.visibility !== 'visible' || p.pct !== '0%' || p.mark !== 'HJ') fail(`${ctx.label}: preloader ${JSON.stringify(p)}`);
      const { data } = await tab.send('Page.captureScreenshot', { format: 'png' });
      save(pre, data, { w: ctx.w, h: ctx.h }, ` pct=${p.pct}`);
    }
  } finally {
    await tab.close().catch(() => {});
  }

  // Stitched in a blank tab once the page tab is gone, so no capture runs in a background tab.
  for (const job of stitches) {
    const blank = await openTab(cdp);
    try {
      const data = await blank.run(pageStitch, { w: job.css.w * ctx.dpr, h: job.css.h * ctx.dpr, tiles: job.tiles });
      const save = Buffer.from(data, 'base64');
      const size = pngSize(save);
      if (size.w !== job.css.w * ctx.dpr || size.h !== job.css.h * ctx.dpr) fail(`${job.item.name}: stitched PNG ${size.w}x${size.h}`);
      writeFileSync(join(OUT, job.item.name), save);
      done(job.item, `${job.css.w}x${job.css.h}${job.tail}`);
    } finally {
      await blank.close().catch(() => {});
    }
  }
}

// ---------------------------------------------------------------- main

async function main() {
  const items = readNames();
  mkdirSync(OUT, { recursive: true });
  const workDir = mkdtempSync(join(tmpdir(), 'export-screens-'));
  const server = await startServer(workDir);
  const { chrome, url } = await startChrome(workDir);
  const cdp = await connect(url);

  const lines = new Map();
  const done = (item, text) => lines.set(item.name, `${item.name} ${text}`);
  for (const reduced of [false, true]) {
    for (const mobile of [false, true]) {
      for (const dark of [false, true]) {
        const ctx = { reduced, mobile, dark, w: mobile ? 390 : 1440, h: mobile ? 844 : 900, dpr: mobile ? 2 : 1 };
        ctx.label = `${ctx.w}x${ctx.h}@${ctx.dpr}x ${dark ? 'dark' : 'light'}${reduced ? ' reduced' : ''}`;
        const mine = items.filter((i) => i.reduced === reduced && i.mobile === mobile && i.dark === dark);
        if (!mine.length) continue;
        await runContext(cdp, ctx, mine, done);
        console.log(`# ${ctx.label}: fonts ${FONTS.length}, images decoded, ${ctx.reduced ? 'poster' : 'video frame'} ok, document ${ctx.scrollWidth} px wide`);
        for (const i of mine) console.log(lines.get(i.name));
      }
    }
  }

  await cdp.send('Browser.close').catch(() => {});
  cdp.close();
  await exited(chrome, 5000);
  process.kill(-server.pid, 'SIGTERM');
  await exited(server, 5000);

  const listed = new Set(items.map((i) => i.name));
  const extra = readdirSync(OUT).filter((f) => f.endsWith('.png') && !listed.has(f));
  if (extra.length) console.error(`export-screens: not in the README list, left in ${OUT}: ${extra.join(' ')}`);
  console.log(`${lines.size} PNGs in ${OUT}`);
}

main().catch((e) => {
  console.error(`export-screens: ${e.message}`);
  if (logFile) console.error(`server log: ${logFile}`);
  process.exit(1);
});
