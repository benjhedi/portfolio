# Apple design system package

Model: `WaraDS-Apple`. One SPM package with a showcase target.

## Layout

```
<Name>DS/
  Package.swift              tools 6.x, platforms iOS 26 (and macOS, visionOS when needed)
  Sources/<Name>DS/
    Tokens/                  WSColor, WSGradient, WSSpacing, WSRadius, WSTypography,
                             WSDuration, WSAnimation
    Resources/Colors.xcassets   every color with light and dark appearance
    Fonts/                   bundled variable font when the brand needs one
    Components/              one file per component, WS prefix
    Modifiers/               view modifiers (glass, glow, appBackground)
    Compat.swift             availability shims, documented
  Sources/<Name>DSShowcase/  one screen per token group and component family
  Tests/                     token resolution, reduce-motion behavior
  MIGRATION.md               state and history when it replaces an older DS
```

## Rules

- Everything prefixed (`WS` for Wara). Tokens live in `Tokens/`; nothing
  else defines a color or a duration.
- Colors come from the assets catalog so dark mode is automatic. The web
  values are the reference; the catalog mirrors them, and a mapping file
  (`MAPPING-Apple.md`) records the correspondence.
- `WSAnimation` reads `accessibilityReduceMotion` and the Eco preference
  and returns `nil` or a plain transition when either is on. Components
  never call `.animation` with a literal.
- A new component follows the existing folder structure and gets a
  showcase entry in the same commit.
- Native chrome first: Liquid Glass through `.glassEffect()` on iOS 26,
  system controls kept native. Custom only for identity components.
- One main type per file. Comments for the why. DocC on public API.

## Versioning

Semver, tags and GitHub releases. A public API change bumps the version
and gets release notes; a published token or component is never changed
silently. Consumers pin a version range in their manifest.

## Consuming

The generator manifest references the package (private SSH URL when
private). The app's design system package depends on it; feature packages
depend on the app's design system, never on the brand package directly, so
a product palette can sit in between.
