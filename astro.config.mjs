// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.pacestreak.com",
  integrations: [sitemap()],
  trailingSlash: "never",
  build: { format: "file" },

  // Warms pages on hover/viewport using <link rel="prefetch">, which is a
  // browser hint rather than a script — so it costs nothing under our CSP.
  prefetch: { prefetchAll: true, defaultStrategy: "viewport" },

  vite: {
    // Tailwind v4 compiles through Vite. This matters for more than tidiness:
    // the play CDN (cdn.tailwindcss.com) is a third-party script and our CSP
    // is `default-src 'self'`, so it would be blocked outright in production
    // while working perfectly in local preview. Compiling at build time is the
    // only version of Tailwind that can ship here.
    plugins: [tailwindcss()],
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
