import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import tls from "node:tls";
import { Agent } from "node:https";

// Reproduces the deployed artifact: a single self-contained HTML file with the
// JS and CSS inlined (same shape as the version served on Render).
//
// The widget calls its backend with same-origin relative URLs (apiBase === "").
// Those routes only exist on the deployed Render server, so in local dev we
// proxy them there. This gives real channel data and real AI-assistant answers
// without CORS. Requires the Render server to be up and internet access.
const BACKEND = "https://optimum-tv-assistant.onrender.com";

// This machine is behind a Zscaler TLS-inspection proxy: the upstream cert is
// re-signed by the internal "Zscaler Root CA". The system/curl trust it, but
// Node ships its own CA bundle and doesn't, which breaks the dev proxy with
// "unable to get local issuer certificate". Fix: ADD the corporate root to the
// trusted set (public roots + Zscaler root). TLS verification stays fully ON.
const caPath = fileURLToPath(new URL("./certs/zscaler-root.pem", import.meta.url));
const proxyAgent = existsSync(caPath)
  ? new Agent({ ca: [...tls.rootCertificates, readFileSync(caPath, "utf8")] })
  : undefined;

const apiRoute = { target: BACKEND, changeOrigin: true, agent: proxyAgent };

export default defineConfig({
  plugins: [viteSingleFile()],
  server: {
    proxy: {
      "/tv-packages": apiRoute,
      "/tv-assistant": apiRoute,
    },
  },
  build: {
    outDir: "dist",
    assetsInlineLimit: 100000000,
    cssCodeSplit: false,
  },
});
