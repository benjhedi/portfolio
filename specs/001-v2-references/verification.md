# Verification 001 - v2 references in the repo

Step 1 (local checks) run by qa on 2026-11-09; step 2 (push, CI, fresh
clone) run by the main session the same day, PR benjhedi/portfolio#29.
Branch `docs-v2-references`: step 1 ran on HEAD b4b0ba3, 11 commits on
top of `origin/dev` f1861e3, working tree clean before and after. Step 2
ran after the push with Hedi's go (`Uploading LFS objects: 100% (3/3),
1.5 MB`), HEAD 8c87dbd on GitHub.

```
Verdict: PASS
Criteria: 9 green, 0 red; the PR `build` job runs AC-9 again on GitHub
Build and lint: npm ci, npm test, npm run build ok under Node 22.23.4 (.nvmrc 22); no lint script in package.json
Screens: 2 captures (light, dark) of the mockup at 1440 x 900; no PNG exists to compare against yet (PNG follow-up)
Scenarios walked: mockup served locally, light then dark, network list and server log read
Not verified and why: artifact sums by qa (it cannot read the artifact; the main session checked them in T01)
```

## Results per criterion

| AC | Test name | Result | Evidence in short |
|---|---|---|---|
| AC-1 | `matchesPublishedSha256ForEveryMockupFile` | PASS | 17/17 `OK`, exit 0; 16 mockup entries, 16 files on disk |
| AC-2 | `loadsEveryLocalReferenceInBothThemes` | PASS, one note | 0 failed requests, every page reference 200 in both themes; dark proven by `data-theme="dark"`; the only 404 is Chrome's implicit `/favicon.ico` |
| AC-3 | `namesSourceVersionSumsAndServeCommand` | PASS | URL line 9, version lines 10 and 62, sums block line 41, `http.server` line 27 |
| AC-4 | `keepsFrenchLogByteIdentical` | PASS | `diff` exit 0, `cmp` identical, same sha256 a6fb25e9... |
| AC-4 | `listsTwelveDatedEnglishEntries` | PASS | 12 entries (4 dated 07, 8 dated 09), all after the block, no French |
| AC-5 | `changesOnlyTitleCountAndNameRule` | PASS | `diff` shows lines 8, 10, 64 only; `grep -c Benjahouach` 0 |
| AC-5 | `leavesOriginalUntouched` | PASS | original sha256 5da289d5...6b74, equal to the value recorded before T05 |
| AC-6 | `keepsSourceClipByteIdenticalOutsideMockup` | PASS | sha256 213146af...e2b9; 0 file under `mockup/` holds it; audio stream present |
| AC-7 | `storesExactlyThreeVideosThroughLfs` | PASS | 3 LFS files, 3 pointers at HEAD, `Git LFS fsck OK`; `lfs-pointers` pass on PR 29; fresh clone gets the 3 videos with their sums |
| AC-8 | `pointsReadOrderToDocsV2` | PASS | `docs/v2/` in all five files; roadmap wave 0 still `- [ ]` |
| AC-9 | `shipsNoDocsFileInDist` | PASS | test and build exit 0; no `docs/` file or sum in `dist/` |
| Extra | secrets, dashes, curly quotes (rule 03, 06) | PASS | no secret pattern; 0 banned characters in README, decision log, SEO copy, pointer diff |

## AC-1 and AC-3 - sums and README

The reference sums are the ones written in `docs/v2/README.md` in T03; the
plan says they are the artifact's published sums for version
1794063463-7380. qa cannot read the artifact, so the comparison to the
artifact itself rests on T03, not on this run.

```
$ cd docs/v2 && sed -n '/^```sha256$/,/^```$/p' README.md | sed '1d;$d' | shasum -a 256 -c
mockup/index.html: OK
mockup/tokens.css: OK
mockup/img/FranceInfos.webp: OK
mockup/img/GearTrack.webp: OK
mockup/img/La1ere.webp: OK
mockup/img/MYTF1.webp: OK
mockup/img/RIDE.webp: OK
mockup/img/WorkoutLife.webp: OK
mockup/img/francetv.svg: OK
mockup/img/hero-poster.jpg: OK
mockup/img/hero.mp4: OK
mockup/img/hero.webm: OK
mockup/img/portrait-sm.jpg: OK
mockup/img/radiofrance.svg: OK
mockup/img/site.jpg: OK
mockup/img/sncf.svg: OK
source/hero-source-2026-11-07.mp4: OK
exit=0
mockup entries in the block: 16 | find mockup -type f | wc -l: 16
```

```
$ grep -n 'https://claude.ai/artifact/BDrsQCHWzgfQRLqBGn9FJM' README.md
9:  https://claude.ai/artifact/BDrsQCHWzgfQRLqBGn9FJM, version
$ grep -n '1794063463-7380' README.md
10:  1794063463-7380, copied as published on 2026-11-09. A reference: the
62:1794063463-7380; the last one is the clip as Hedi supplied it.
$ grep -n 'http.server' README.md
27:cd docs/v2/mockup && python3 -m http.server 8765
$ grep -n '^```sha256$' README.md
41:```sha256
```

## AC-2 - served locally, light then dark

No in-app browser for qa, so the plan's network list came from headless
Chrome driven over the DevTools protocol: fresh profile per theme (empty
`localStorage`), viewport 1440 x 900, `Emulation.setEmulatedMedia`
`prefers-color-scheme` light then dark, `Network.responseReceived` and
`Network.loadingFailed` recorded, 5 s real wait, then a probe and a
screenshot. A first try with `--screenshot --virtual-time-budget` caught
the preloader at 26 % (its `requestAnimationFrame` loop does not advance
under virtual time) and was discarded.

```
$ cd docs/v2/mockup && python3 -m http.server 8765 --bind 127.0.0.1 > server.log 2>&1 &
$ Google Chrome --headless=new --user-data-dir=<fresh> --remote-debugging-port=9333 about:blank &
$ node capture.mjs 9333 light mockup-light-1440x900.png network-light.json
{"dataTheme":null,"prefersDark":false,"storedTheme":null,"bodyBg":"rgb(230, 235, 244)","loaderDone":true,
 "videoSrc":"http://127.0.0.1:8765/img/hero.webm","videoReadyState":4,"brokenImages":[]}
$ node capture.mjs 9333 dark mockup-dark-1440x900.png network-dark.json
{"dataTheme":"dark","prefersDark":true,"storedTheme":null,"bodyBg":"rgb(10, 17, 32)","loaderDone":true,
 "videoSrc":"http://127.0.0.1:8765/img/hero.webm","videoReadyState":4,"brokenImages":[]}
```

Network list, same in both themes (order varies): 200 on `/`,
`tokens.css` and the 13 images (`hero-poster.jpg`, `site.jpg`, the six
`.webp`, the three `.svg`, `portrait-sm.jpg`), 200 Media on
`img/hero.webm`, 200 on the Google Fonts stylesheet and two font files
(external, out of scope), 404 Other on `/favicon.ico`, `failures: []`.

`hero.mp4` is the second `<source>`; Chrome picks `hero.webm` and never
requests it. Checked by hand while the server ran:

```
$ curl -s -o hero-served.mp4 -w '%{http_code} %{size_download} %{content_type}\n' http://127.0.0.1:8765/img/hero.mp4
200 492791 video/mp4
$ shasum -a 256 hero-served.mp4
c6262406309aa65ae999dcbfc49184835fac470f4ed84425e4629a07adab22c8
```

Server log, all runs (two discarded `--screenshot` tries, the two CDP runs,
one `curl /`):

```
$ grep ' 404 ' server.log
"GET /favicon.ico HTTP/1.1" 404 -    (x5, one per page load)
$ grep ' 404 ' server.log | grep -vc favicon.ico
0
$ grep -c -i -E 'favicon|rel=.?icon' index.html
0
```

The favicon 404 is the browser's default request, not a reference of the
page: `index.html` declares no icon. AC-2 asks for every local reference
of the page, so it passes. Hedi decides whether that request should count;
if it should, the fix is a mockup change, which spec 001 puts out of scope.
The server was stopped after the run (port 8765 free).

Screenshots, no PNG to compare against until the PNG follow-up:

- light: `/private/tmp/claude-501/-Users-wara-Documents-Developpement-Personnel-IA-Projects-Portfolio--claude-worktrees-docs-v2-references-ef5724/38a87959-873e-4ab1-bda5-c90b6f48813c/scratchpad/qa/mockup-light-1440x900.png`
- dark: `/private/tmp/claude-501/-Users-wara-Documents-Developpement-Personnel-IA-Projects-Portfolio--claude-worktrees-docs-v2-references-ef5724/38a87959-873e-4ab1-bda5-c90b6f48813c/scratchpad/qa/mockup-dark-1440x900.png`

Seen in both: nav with "Hedi Jahouach", FR / EN, theme toggle and "Me
contacter"; the oval hero with the video frame (not the poster: the video
reached `readyState` 4, so the LFS objects are real files); name, tagline
and the bottom bar. The dark capture has a near-black background
(`rgb(10, 17, 32)`) and light text. Reduce Motion path not walked: not an
AC of this spec.

## AC-4 - decision log

```
$ grep -n -E 'verbatim:(start|end)' docs/v2/decision-log.md
12:<!-- verbatim:start -->
35:<!-- verbatim:end -->
$ sed -n '/<!-- verbatim:start -->/,/<!-- verbatim:end -->/p' docs/v2/decision-log.md | sed '1d;$d' > verbatim-block.md
$ diff verbatim-block.md ".../side-session-notes/local_62b2ea9b-.../v2-decision-log-2026-11-07-verbatim.md"
diff exit=0
$ cmp verbatim-block.md <reference>
cmp: byte-identical
$ shasum -a 256 verbatim-block.md <reference>
a6fb25e90e849e8acf9643c6c2cc6220edf650e9f0ced9ad0b5061441ba1dc98  (both, 22 lines each)
```

```
$ grep -c -E '^- 2026-11-(07|09): ' docs/v2/decision-log.md
12
$ grep -c -E '^- 2026-11-07: ' / '^- 2026-11-09: '
4 / 8
entry lines: 39 41 43 46 48 50 53 55 57 59 61 63 (all after the block, under "Entries since 2026-11-07")
$ sed -n '37,64p' docs/v2/decision-log.md | sed 's/"[^"]*"//g' | grep -i -w -E 'le|la|les|des|est|une|pour|avec|dans|sur|qui|que|et'
no French function words
```

The 12 entries read against the AC-4 list, in order: Jahouach only,
blocks not reused, "Voir le projet" open, option B with Vitest
(2026-11-07); branches from `dev`, screen = section, PNG follow-up, log
language, SEO copy in Jahouach, clip kept with audio, prompts left in
Cowork, LFS videos (2026-11-09). All present. The only French inside the
section is the quoted label "Voir le projet".

## AC-5 - SEO copy

```
$ diff /Users/wara/Documents/Developpement/Personnel/IA/Projects/Portfolio/SEO-accueil.md docs/v2/seo-accueil.md
8c8
< ## Title (48 caractères)
---
> ## Title (46 caractères)
10c10
< Hedi Benjahouach, consultant iOS freelance senior
---
> Hedi Jahouach, consultant iOS freelance senior
64c64
< - Nom propre uniforme : Hedi Benjahouach (un seul mot, pas "Ben Jahouach").
---
> - Nom propre uniforme : Hedi Jahouach (sans "Ben").
$ grep -c Benjahouach docs/v2/seo-accueil.md
0
$ sed -n 10p docs/v2/seo-accueil.md | tr -d '\n' | wc -m
46
$ shasum -a 256 /Users/wara/Documents/Developpement/Personnel/IA/Projects/Portfolio/SEO-accueil.md
5da289d5516ad66623bd464605f35a2d2676edb282a0b59691f6816e4cb26b74
$ git -C <main checkout> status --porcelain -- SEO-accueil.md
?? SEO-accueil.md
```

Both files are 66 lines; the hash equals the one recorded before T05 and
the original is still untracked in the main checkout.

## AC-6 - source clip

```
$ shasum -a 256 docs/v2/source/hero-source-2026-11-07.mp4
213146af827ef968cec922fc7f0a1da104b54c67278ae545e6abbaa9fdd4e2b9
$ find docs/v2/mockup -type f -exec shasum -a 256 {} + | grep -c 213146af827ef968cec922fc7f0a1da104b54c67278ae545e6abbaa9fdd4e2b9
0
$ ffprobe -v error -show_entries stream=codec_type,codec_name,width,height,r_frame_rate -show_entries format=duration -of compact <clip>
stream|codec_name=h264|codec_type=video|width=896|height=720|r_frame_rate=24/1
stream|codec_name=aac|codec_type=audio|r_frame_rate=0/0
format|duration=5.041667
```

Matches the README description (896 x 720, 24 fps, 5.04 s, audio kept).

## AC-7 - Git LFS, local part

```
$ git lfs version
git-lfs/3.8.1 (GitHub; darwin arm64; go 1.27.3)
$ git lfs ls-files
c626240630 * docs/v2/mockup/img/hero.mp4
5c849f9cce * docs/v2/mockup/img/hero.webm
213146af82 * docs/v2/source/hero-source-2026-11-07.mp4
$ git cat-file -p HEAD:docs/v2/mockup/img/hero.mp4
version https://git-lfs.github.com/spec/v1
oid sha256:c6262406309aa65ae999dcbfc49184835fac470f4ed84425e4629a07adab22c8
size 492791
$ git cat-file -p HEAD:docs/v2/mockup/img/hero.webm
version https://git-lfs.github.com/spec/v1
oid sha256:5c849f9cce7a5755c55627374bcc0d1a71a737d1bd2616c9a763f0075ef364ef
size 189147
$ git cat-file -p HEAD:docs/v2/source/hero-source-2026-11-07.mp4
version https://git-lfs.github.com/spec/v1
oid sha256:213146af827ef968cec922fc7f0a1da104b54c67278ae545e6abbaa9fdd4e2b9
size 814142
$ git lfs fsck --pointers origin/dev..HEAD
Git LFS fsck OK
exit=0
$ git check-attr filter <3 videos> docs/v2/mockup/img/site.jpg
hero.mp4: filter: lfs | hero.webm: filter: lfs | hero-source-2026-11-07.mp4: filter: lfs | site.jpg: filter: unspecified
```

Each pointer oid equals the README sum of its file. Push readiness (plan
risk): `core.hooksPath` is the main checkout's `.githooks/`, whose
`pre-push` runs `git lfs pre-push` (line 35).

Step 2, 2026-11-09. `gh pr checks 29`: `lfs-pointers pass 5s`,
`conventions pass 6s`. Fresh `git clone --branch docs-v2-references` from
GitHub into the scratchpad: `git lfs ls-files` lists the 3 videos, and
`shasum -a 256` gives 213146af...fdd4e2b9 (clip), c6262406...ab22c8
(hero.mp4), 5c849f9c...64ef (hero.webm), the README sums; the clip starts
with an MP4 `ftypisom` header, not a pointer.

## AC-8 - pointers

```
$ grep -n 'docs/v2/' AGENTS.md
21:4. Before any screen: `docs/v2/` (README, mockup, decision log); the
$ grep -n 'docs/v2/' CLAUDE.md
48:- v2 references (mockup, decision log, SEO input) live in `docs/v2/`.
$ grep -n 'docs/v2/' product/mission.md
3:Sources: [log] `docs/v2/decision-log.md` (...); [mockup] `docs/v2/mockup/`, frozen from claude.ai artifact BDrsQCHWzgfQRLqBGn9FJM, version 1794063463-7380; [SEO] `docs/v2/seo-accueil.md`.
$ grep -n 'docs/v2/' product/roadmap.md
3:Sources: [log] `docs/v2/decision-log.md`; [mockup] `docs/v2/mockup/`, frozen from claude.ai artifact BDrsQCHWzgfQRLqBGn9FJM; [inv] ...
14:- [ ] Wave 0: the v2 log, the mockup and its media, and `SEO-accueil.md` are versioned in `docs/`, ... Sources in `docs/v2/` since spec 001; open until the PNG follow-up exports one PNG per section, light and dark.
$ grep -n 'docs/v2/' product/tech-stack.md
47:- Mockup: `docs/v2/mockup/`, frozen from claude.ai artifact BDrsQCHWzgfQRLqBGn9FJM at version 1794063463-7380 (spec 001).
$ grep -rn BDrsQCHWzgfQRLqBGn9FJM AGENTS.md CLAUDE.md product/
mission.md:3, roadmap.md:3, tech-stack.md:47 only, each as "frozen from" the source
```

## AC-9 - test, build, dist

Node 22.23.4 through fnm (the shell default is Node 26; `.nvmrc` says 22).

```
$ npm ci --no-audit --no-fund
added 168 packages in 3s
npm ci exit=0   (log scanned: 0 token-like strings)
$ npm test
 RUN  v4.1.12 .../docs-v2-references-ef5724
No test files found, exiting with code 0
npm test exit=0
$ npm run build
dist/assets/index-DFa9YZ9E.css   55.63 kB | gzip: 14.80 kB
dist/assets/index-CbBEEK7E.js   461.05 kB | gzip: 157.35 kB
built in 928ms
npm run build exit=0
```

`npm test` is green with zero test files (`--passWithNoTests`): `origin/dev`
has no `*.test.ts` either, and this change adds no TypeScript (tasks.md,
ADR 001). Green, but it proves only that the runner starts.

```
$ find dist -type f | wc -l
33
$ find dist -type f | grep -i -E 'decision-log|seo-accueil|hero-source|mockup|tokens\.css|...|docs'
dist/projects/{FranceInfos,FranceInfos1-3,La1ere,WorkoutLife,GearTrack,RIDE,MYTF1}.png, dist/logos/{sncf,francetv,radiofrance}.svg
$ for f in dist files outside assets/ and index.html: cmp with public/<same path>
twins=20 missing=2 (dist/wrangler.json, dist/.assetsignore: generated by the build)
$ sha256 of every dist file matched against the 17 README sums
0
$ grep -r -l -E '1794063463|BDrsQCHWzgfQRLqBGn9FJM|decision-log|seo-accueil' dist
no match
$ git diff --name-only origin/dev..HEAD -- public src | wc -l
0
```

The name matches are the v1 `public/` assets, byte-identical to their
`public/` twins, and no `dist/` file has the bytes of a versioned
reference. `dist/` is gitignored (`.gitignore:5`) and was removed after the
check.

## Extra - secrets and writing style

Text files scanned: `docs/v2/README.md`, `decision-log.md`,
`seo-accueil.md`, `mockup/index.html`, `mockup/tokens.css`, the three
`.svg`.

```
$ grep -n -i -E '(api[_-]?key|secret|passw(or)?d|_authtoken|bearer |authorization:|ghp_...|github_pat_|gho_|sk-...|AKIA...|xox[bpa]-|BEGIN ... PRIVATE KEY|npm_...|token=)' <8 files>
no match
$ grep -n -o -E '<email>|<French phone>' <8 files>
mockup/index.html:645: the contact mail (present in src/content/content.ts, grep -c 1)
other hits: version digits and SVG coordinates, not phone numbers
$ grep -n -P '[\x{2013}\x{2014}\x{2018}\x{2019}\x{201C}\x{201D}]' docs/v2/README.md
none
$ awk 'NR<=11 || NR>=36' docs/v2/decision-log.md | grep -P '<same class>'
none
$ grep -c -P '<same class>' docs/v2/decision-log.md docs/v2/seo-accueil.md
0, 0
$ git diff origin/dev..HEAD -- AGENTS.md CLAUDE.md product/ | grep '^+' | grep -c -P '<same class>'
0
positive control: a file holding U+2014 gives 1
```

The mockup also carries the LinkedIn URL, present in `content.ts` too
(grep -c 1): no personal data beyond what the plan allows.

## Not verified and why

- The 16 mockup sums against the artifact itself: qa cannot read the
  artifact; the main session compared each file with the sha256 the
  artifact read reported in T01, and the README from T03 carries them.
- Mockup PNG comparison: no PNG exists before the PNG follow-up.
- Reduce Motion and Eco paths: no AC in this spec covers them.

## Scratch evidence

Under `/private/tmp/claude-501/-Users-wara-Documents-Developpement-Personnel-IA-Projects-Portfolio--claude-worktrees-docs-v2-references-ef5724/38a87959-873e-4ab1-bda5-c90b6f48813c/scratchpad/qa/`:
`server.log`, `network-light.json`, `network-dark.json`,
`scripts/capture.mjs`, `verbatim-block.md`, `npm-ci.log`, `npm-test.log`,
`npm-build.log`, the two screenshots.
