import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// Build config for the shareable, fully self-contained demo (GitHub Pages).
//
// Uses share.html as the entry (offline shim + v2 app). viteSingleFile inlines
// all JS/CSS into one HTML file, so the output has no external asset paths and
// works from any subpath (e.g. https://<user>.github.io/<repo>/).
//
// No dev proxy here: the offline shim serves baked-in data, so no backend or
// corporate TLS cert is needed to build or run this artifact.
export default defineConfig({
  base: "./",
  plugins: [viteSingleFile()],
  build: {
    outDir: "docs",
    emptyOutDir: true,
    assetsInlineLimit: 100000000,
    cssCodeSplit: false,
    rollupOptions: {
      input: "share.html",
    },
  },
});
