# Changelog

All notable changes to the landing page are recorded here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This site is continuously deployed rather than versioned, so entries are dated.

## [Unreleased]

### Changed

- Rebuilt on Astro. `stamp.py` and `build.py` are gone — Astro content-hashes
  asset filenames and publishes only `dist/`, which is what those 148 lines
  were substituting for.
- `assetsInlineLimit: 0`, because Astro inlines small scripts and Vite inlines
  sub-4KB assets as `data:` URIs. The CSP is `script-src 'self'`, so either
  would have been blocked by the browser, silently.
- Licensed under AGPL-3.0.

### Added

- A real 404 page. Pages was answering every unknown path with index.html and
  a 200 — a soft 404, which lets search engines index the homepage under any
  number of wrong URLs.
- X/Twitter link in the footer and `/twitter` and `/x` vanity redirects.
  Handle verified as `@PaceStreak` before linking — `x.com` returns HTTP 200
  for nonexistent accounts, so the page title is the only reliable signal.
- `twitter:site` so shared links attribute the card to the account.
- Social images for every platform under `brand/social/`, and the `og:image`
  the site had been missing despite declaring `summary_large_image`.


## 2026-08-28

### Added

- Initial landing page: hero with a seeded activity grid, how-it-works, feature
  grid, waitlist call to action and FAQ. No build step, no dependencies.
- `hello@pacestreak.com` surfaced as the public contact.
- GitHub and Instagram links in the footer, plus `/github` and `/instagram`
  vanity redirects via `_redirects`.
- Brand asset set under `brand/` — badge logo, bolt mark, and PNG exports.
- Security headers and a `default-src 'self'` Content-Security-Policy via
  `_headers`.
- `stamp.py`, which stamps a content hash onto asset URLs before deploy.

### Fixed

- Activity grid cells all rendered the same colour: `.heat i` was specificity
  0-1-1 and beat the single-class `.lvl--N` rules.
- Footer social icons shipped at ~170px. New markup had deployed against a
  four-hour-old cached stylesheet, because asset filenames carry no content
  hash and Cloudflare Pages ignores `Cache-Control` from `_headers` for
  `/assets/*`. This is what `stamp.py` now prevents.

### Changed

- `www.pacestreak.com` is canonical; the apex 301-redirects to it.
- Status link points at `status.pacestreak.com` rather than the owner's
  private all-projects page.
