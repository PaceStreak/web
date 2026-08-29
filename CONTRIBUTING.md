# Contributing

See the [organization guide](https://github.com/PaceStreak/.github/blob/main/CONTRIBUTING.md)
for anything general. This file covers what is specific to the public site.

## Getting set up

```bash
npm install
npm run dev      # http://localhost:4321
```

Before opening a pull request, run what CI runs:

```bash
npm run build && python3 check-html.py dist
```

## Non-negotiables

These will fail review, and most of them fail silently in production rather
than loudly in the build:

- **No third-party origins.** The CSP is `default-src 'self'`. No font CDN, no
  analytics, no embedded widget. If you need a dependency, vendor it.
- **No inline scripts or styles.** There is no `'unsafe-inline'`. If a build
  tool inlines something for you, turn that off — `assetsInlineLimit: 0` in
  `astro.config.mjs` exists for exactly this — rather than loosening the
  policy.
- **No auth, no session, no API call.** This site is static and must stay
  independent of the product. See
  [ARCHITECTURE.md](./ARCHITECTURE.md#why-this-is-not-the-product).
- **`404.astro` must keep emitting `dist/404.html`.** Without it Pages returns
  `index.html` with a **200** for every unknown path, including `/robots.txt`.
- **No pricing claims.** There is no pricing yet, and a page that invents one
  is a promise nobody agreed to.

## Design review criteria

The page has been through several rounds of this. The conclusions:

- **Contrast must meet WCAG AA against the actual background**, including
  cards, not just the page background. Muted greys that look fine routinely
  measure around 4.0:1 and fail. `--dim` was `#71717a` (4.09:1) and had to
  become `#8b8b95` (5.87:1).
- **Layouts must work from 320px to 1920px.** Test the narrow end; it is where
  things break and where phones are.
- **Everything animated sits behind `prefers-reduced-motion`**, and the settled
  state is the correct one.
- **A visible focus ring and a working skip link** are not optional.

## Two bugs that keep coming back

- **CSS specificity.** `.heat i` sets no `background` on purpose: it would be
  specificity 0-1-1 and beat the single-class `.lvl--N` rules, flattening every
  grid cell to one colour. Paint cells only via the level class.
- **`padding` shorthands inside `.wrap`.** A shorthand resets `padding-inline`
  to 0 and collapses the page gutter on mobile. Use `padding-block`.

## Commits

Conventional commits (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`). The
subject line says what changed; the body says **why**, because the what is
already in the diff.

## Security

Do not open an issue for a vulnerability. Email **<hello@pacestreak.com>** —
see [SECURITY.md](./SECURITY.md).
