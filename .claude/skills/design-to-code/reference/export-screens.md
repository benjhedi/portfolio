# Exporting screens to PNG

One PNG per screen and variant, at device size, both themes when the README
asks. The procedure is written in the handoff README so any session can
repeat it; this file is the generic version.

## Setup

```bash
cd HadoffDesign/ios
python3 -m http.server 8765        # Babel needs http, not file://
```

`export-ecran.html` renders exactly one screen without the device bezel,
at the logical size of the target device (for example 402 x 874 for an
iPhone 17 class device, 2x scale), reading `?screen=HiToday&p=empty&theme=dark`.

## Capture

Headless Chrome, one command per screen:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --hide-scrollbars --force-device-scale-factor=2 \
  --window-size=402,874 \
  --screenshot="ecrans/02-today.png" \
  "http://localhost:8765/export-ecran.html?screen=HiToday"
```

A small script in the folder loops over the screen list declared in the
README and writes every PNG. Stop the server afterwards.

## Naming

`NN-kebab-name.png`, `NN` in flow order (`01-onboarding`, `02-today`,
`03-new-habit`). Variants append the flag: `02-today-empty.png`,
`07-paywall-dark.png`. The README lists the PNGs and their count; the list
is the contract, the folder must match it.

## Check before handing off

Open every PNG produced. Figures add up, nothing overlaps, text readable at
12 pt minimum, both themes present when required, status bar and safe
areas correct. A PNG that fails is re-exported, not patched.

## Why PNG and not only HTML

The implementer compares the running app side by side with a fixed image.
The HTML stays the editable source; the PNG is the frozen contract that a
review can point to by name.
