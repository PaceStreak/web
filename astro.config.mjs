// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.pacestreak.com",
  integrations: [sitemap()],
  trailingSlash: "never",
  build: { format: "file" },
  vite: {
    build: {
      // Emit every asset as a real file. Vite inlines anything under 4KB as a
      // base64 data: URI, and our CSP is `script-src 'self'` with no
      // 'unsafe-inline' — an inlined script is blocked by the browser,
      // silently. Files also get content hashes, which is what replaced the
      // hand-rolled stamp.py.
      assetsInlineLimit: 0,
    },
  },
});
