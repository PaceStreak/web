# Changelog

All notable changes to the public site are recorded here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This site is continuously deployed rather than versioned, so entries are dated.

## [Unreleased]

### Added

- Privacy policy and terms rewritten for accounts and health data, stated
  against what the code does.

- **Product pages.** `/features`, `/streaks` (with a streak simulator running a
  TypeScript port of the engine, `src/lib/chain.ts`), `/social` and
  `/security`. Every product claim comes from `src/data/product.ts`, whose
  numbers are taken from the API and app code.
- A CSS-only `<details>` mobile menu; nav links for the new pages.
- Pauses, planned rest, the weekly recap, file import and the calendar feed
  are described once they shipped in the product.

### Changed

- The hero grid shows a streak in **weeks** (it showed 47 days, but streaks
  count kept weeks) and includes rest days inside the streak.
- About no longer says there is no feed or leaderboard. Both exist, opt-in and
  attendance-only. The FAQ covers missed weeks, injury, watch import, the social
  side and XP.

### Fixed

- **The activity grid rendered as an empty card during the Tailwind rewrite,
  twice, for two different reasons.** First, `grid-template-rows: repeat(7,
  1fr)` sized the rows from the container height while `aspect-ratio: 1` cells
  sized the container height from the rows — circular, resolving to zero.
  Second, the fade-in set `opacity: 0` inline and filled `forwards`, so when the
  `@keyframes` block went missing every square stayed invisible. Columns are now
  the definite axis, and the animation fills `backwards` so the settled state is
  correct without it.
- `app.js` looked up the streak card by a styling class the rewrite deleted, which
  silently disabled the on-screen trigger for the counters. It uses a data
  attribute now — a restyle cannot rename it.

### Removed

- **All pricing claims.** The FAQ promised "a free tier that keeps working and
  a paid tier for deeper history and analysis", and the hero said "free while
  in beta". There is no pricing plan yet, so both were commitments the product
  could not honour. Replaced the cost question with one that can actually be
  answered — whether a wearable is required.

### Changed

- **This repository is now `PaceStreak/web`** (renamed from `landing`). It is
  no longer a placeholder awaiting a real frontend: it is the public site, and
  it stays that way. The product moved to
  [`PaceStreak/app`](https://github.com/PaceStreak/app) on
  `app.pacestreak.com`, which keeps this deployment static and free of any auth
  dependency — a product outage cannot take down the page that explains the
  product. `package.json` renamed to match.

- **The hero glow was `position: fixed`**, so it was welded to the viewport and
  followed the reader down the page, washing lime over the features, the call
  to action and the FAQ rather than sitting behind the fold. It also forced a
  repaint on every scroll frame. Anchored to the hero instead.
- **FAQ relaid out again.** The two-up grid was worse than it looked: each
  card sized to its own content so the bottoms were ragged, the reading order
  was ambiguous (across or down?), and opening one answer jumped the whole row.
  Now the heading sits in a sticky left column and the questions run down a
  single column on the right — obvious reading order, and opening an answer
  pushes only what is below it.
- **FAQ first redesign (superseded above).** It was bare horizontal rules in a 760px column inside a
  much wider container, which stranded it beside a large empty space and left a
  long gap between each question and its marker. Now bordered cards matching
  the steps and features sections, two-up above 900px and single column below.
- Footer separators are drawn in CSS rather than typed between the links. In
  the markup they depended on newline whitespace, which Astro collapses — the
  footer rendered `hello@pacestreak.com ·Build log ·Status`, with a space
  before each dot and none after.
- Rebuilt on Astro. `stamp.py` and `build.py` are gone — Astro content-hashes
  asset filenames and publishes only `dist/`, which is what those 148 lines
  were substituting for.
- `assetsInlineLimit: 0`, because Astro inlines small scripts and Vite inlines
  sub-4KB assets as `data:` URIs. The CSP is `script-src 'self'`, so either
  would have been blocked by the browser, silently.
- Licensed under AGPL-3.0.

### Added

- **Cross-document view transitions, in CSS.** `@view-transition { navigation:
  auto }` plus a named header, so moving between pages cross-fades instead of
  blanking. Zero JavaScript; Chromium 126+ and Safari 18.2+ animate and
  everything else navigates as before. Measured first: pages already served in
  83-117ms total from the edge with prefetch ahead of the click, so this was a
  paint problem, not a speed one — and not a reason to adopt a client-side
  router.
- **`check-html.py` now fails on inline `style` attributes.** `style-src 'self'`
  drops them silently. Added immediately after a `view-transition-name` nearly
  shipped as a `style=""` attribute. Inline styles inside `<pre>` are exempt —
  that is Shiki's build-time highlighting, which the blog's CSP allows on
  purpose.
- **A real multi-page site.** `/about`, `/faq`, `/privacy` and `/terms` now
  exist; all three of the latter used to 404. Every page routes through one
  `Base` layout, so a new page cannot ship without a canonical URL, an OG image
  or a skip link.
- **Tailwind CSS v4**, compiled through `@tailwindcss/vite`. The play CDN was
  never an option: it is a third-party script and the CSP is
  `default-src 'self'`, so it would be blocked in production while working in
  local preview.
- `FAQPage` structured data on `/faq`, generated from the same array the page
  renders, so an answer cannot say one thing to a reader and another to a
  search engine.
- Link prefetching on hover and in viewport, via `<link rel="prefetch">` — a
  browser hint rather than a script, so it costs nothing under the CSP.
- A footer with real navigation columns, and popular-page links on the 404.
- `ARCHITECTURE.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md` and
  `.editorconfig`. The security policy is per-repository because community
  health files in a public `.github` repository do not apply to private ones.
- The README now records the two bugs that keep recurring — the `.heat i`
  specificity trap and `padding` shorthands collapsing `.wrap`'s gutter —
  rather than leaving them to be rediscovered.
- `check-html.py` and a CI workflow. Astro collapses whitespace between text
  and an inline element, which shipped `Write tohello@pacestreak.com` three
  separate times; and the CSP has no `unsafe-inline`, so an inlined script or
  `data:` URI is blocked by the browser silently. Both are now build failures.
  The checker is tested against known-bad fixtures, not merely asserted to pass.
- The build log at blog.pacestreak.com, linked from the nav, the closing call
  to action and the footer, plus a `/blog` short link and RSS auto-discovery.
- `Organization` structured data. It is an `application/ld+json` data block,
  not an executable script, so `script-src 'self'` does not apply to it.
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
