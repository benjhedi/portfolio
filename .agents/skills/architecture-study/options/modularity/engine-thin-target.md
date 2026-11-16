# Modularity: engine and thin target

The product's engine lives in local packages that know nothing about the
niche or the brand; the app target is thin: configuration, assets, a
`NicheConfiguration`, nothing else. A second product is a second thin
target on the same engine. Doable's shape (eight `Habit*` packages, the
`Doable` target, a widget target).

## Layout

```
<Engine>Domain/        pure engine, stdlib only, NicheConfiguration contract
<Engine>Persistence/   storage adapter, versioned schema
<Engine>Scheduling/    reminders, notifications
<Engine>Paywall/       purchases, free tier limits
<Engine>DesignSystem/  tokens and components (consumes the brand DS)
<Engine>UI/            screens and business components
<Engine>Analytics/     SDK adapter, isolated, consent-gated
<App>/                 thin target: configuration, assets, no logic
<App>Widgets/          extension sharing the engine through an App Group
```

## Boundary rules

- The engine never contains the niche's name, texts, seeds or theme:
  everything product-specific flows through `NicheConfiguration`.
- One package per external world; a third-party SDK is imported by
  exactly one package.
- The thin target holds no business logic; a rule found there is a review
  error.
- Versioned public API when the engine is shared across repos.

## What it buys

Re-skin for a new niche without touching the engine; widgets and other
extensions as first-class consumers; SDKs confined; domain tested alone.

## What it costs

The most manifests and the most mapping; the discipline to keep the
niche out of the engine every single day; a slower first build.

## Fits when

A second niche or target is a real plan (not a wish), a widget or watch
app exists, SDKs must be confined, the engine may be sold or reused.

Triggers to leave it: the second target never came and every change
crosses five packages, so collapse toward packages by layer. Rare; the
usual trigger is the reverse, a single target growing a widget.
