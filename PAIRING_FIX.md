# Pairing Code Fix

The pairing flow was corrected to follow the official Baileys pairing-code lifecycle:

- The socket no longer waits for `connection: open` before requesting a pairing code.
- `requestPairingCode()` is triggered by the initial `qr` event, which is the supported pairing-code trigger.
- The socket uses Baileys' default/canonical browser configuration during pairing.
- Phone numbers are normalized to country-code + digits only.
- Failed fresh sessions are cleaned so a broken attempt cannot poison the next attempt.
- Pairing state is saved only after a valid 8-character code is returned.
- The stale shared pairing.json file is reset on distribution.
- Baileys is pinned to 7.0.0-rc13 to match package-lock.json in this archive.

Important: pairing-code support is controlled by WhatsApp/Baileys and can occasionally fail server-side. The bot now reports the actual pairing error instead of hiding it behind a generic "service unavailable" message.
