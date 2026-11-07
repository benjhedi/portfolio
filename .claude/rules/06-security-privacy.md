# Security and privacy

## Secrets

- API keys and tokens live in the Keychain on Apple platforms, in the
  encrypted store the platform offers elsewhere. Never in `UserDefaults`,
  never in plaintext, never in a committed `.env`.
- Local debug keys come from environment variables, not from source.
- The `.gitignore` excludes `.env`, `.env.*`, `*.pem`, `*.key`,
  `credentials/`. Check it exists before the first commit of a new repo.
- Never print, log or paste a secret, even redacted "for the example".

## User data

- Local-first by default. A network call is explicit, configurable and
  triggered by a user action; it never runs silently in the background.
- No logging of user content in release builds. Debug logs that contain
  user content are wrapped so they compile out of release.
- Personal data stored at rest is encrypted when the platform allows it.
- Transcripts, voice data and health-adjacent data get the strictest
  treatment: encrypted at rest, deletable by the user, never exported
  without an explicit action.

## GDPR as a feature

A model that stores a name, phone, email or any personal field carries the
consent and retention fields the project defines (for example
`consentGivenAt`, `consentWithdrawnAt`, `dataRetentionDeadline`). Deleting a
person cascades to their related personal data. Missing fields are a bug,
not a style issue, and block a review.

## Telemetry

No analytics in an MVP unless the product requires it. When analytics exist,
they are isolated in one module, consent-gated, without advertising
identifiers, and inert when consent is absent.

## HTTPS

Always. A legacy backend on HTTP is a migration item, never an exception
written into the client.
