# Optimum TV AI widget (local copy)

A local, editable copy of the plan-picker widget deployed at
`https://optimum-tv-assistant.onrender.com/`.

The deployed site is a Vite + React app compiled into a single self-contained
HTML file. This project unpacks that artifact into editable source so you can
run it locally with hot reload and rebuild the same single-file output.

The frontend talks to a backend via same-origin relative URLs (`apiBase` is
`""`): `/tv-packages` (channel lists) and `/tv-assistant` (the AI assistant).
Those routes only exist on the deployed Render server, so local dev **proxies
them to Render** (see `vite.config.js`). This gives real channel data and real
AI answers. It requires internet access and the Render server to be up.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

### TLS note (Zscaler)

This machine is behind a Zscaler TLS-inspection proxy, so the dev proxy needs to
trust the internal "Zscaler Root CA" (Node otherwise fails with `unable to get
local issuer certificate`). The public root cert lives in `certs/zscaler-root.pem`
(git-ignored). TLS verification stays fully on — we just add this root to the
trusted set. If it's missing, regenerate it:

```bash
mkdir -p certs
security find-certificate -a -c "Zscaler" -p \
  /System/Library/Keychains/SystemRootCertificates.keychain > certs/zscaler-root.pem
security find-certificate -a -c "Zscaler" -p \
  /Library/Keychains/System.keychain >> certs/zscaler-root.pem
```

## Build a production single-file HTML

```bash
npm run build     # outputs dist/index.html (self-contained, like the deployed version)
npm run preview   # serve the built file locally
```

## Project layout

- `index.html` — HTML shell (favicon, Poppins font, `#root` mount) that links the sources below.
- `src/styles.css` — all styles, extracted from the deployed build. Clean and fully editable.
- `src/main.js` — the app bundle, extracted from the deployed build and reformatted with Prettier.

## Editing notes

- `src/styles.css` is human-authored CSS with real class names (`.plan-card`, `.cart`, `.tvw-conversation`, `.ch-modal`, ...), so styling changes are straightforward.
- `src/main.js` was recovered from the **minified** production bundle. It has been
  reformatted so the structure, JSX (as `jsx(...)` calls), text, and class names are
  readable and editable, but variable/function names remain minified (e.g. `C()`,
  `S.jsx(...)`). Editing copy, styling, and layout is easy; deep logic changes are harder.
  If you want clean, named React components, that's a follow-up refactor.

## Provenance

Recovered from the deployed build artifact; not the original source repository.
