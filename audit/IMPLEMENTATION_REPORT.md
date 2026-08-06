# Implementation Report — apps.0xvera.com

**Date:** 2026-08-06  
**Repository (planned):** `jowy81/apps-0xvera-landing`  
**Authenticated GitHub account:** `jowy81` (verified via `gh auth status`)  
**Remote repository status:** does not exist yet (safe to create)

## Status

**LISTA PARA PUBLICAR REPOSITORIO**

Not `LISTA PARA DESPLEGAR` because:

- CardQR privacy policy is still a draft placeholder (`draft: true`, `noindex`)
- MeteOpen / Cupid’s Oracle product details are incomplete by design
- Final legal/hosting placeholders remain in portal privacy
- Production GA4 ID is intentionally unset
- Visual brand assets are placeholders

## Stack final

| Layer | Choice |
| --- | --- |
| Framework | Astro 7.2 (static) |
| Language | TypeScript strict |
| Package manager | pnpm 11.0.8 (`packageManager` pinned) |
| Node | 22 LTS (`.nvmrc`) |
| Styling | Custom CSS tokens (no Tailwind) |
| Content | Astro Content Collections + Zod |
| i18n | `en` (default) + `es` (`/es`) |
| Analytics | Consent-gated GA4 (optional) |
| Hosting target | Cloudflare Pages (`public/_headers`) |
| Tests | Vitest + Playwright |
| CI | GitHub Actions + Dependabot |

## Routes

### English

- `/`
- `/cardqr`, `/meteopen`, `/cupids-oracle`
- `/cardqr/privacy`, `/meteopen/privacy`, `/cupids-oracle/privacy`
- `/cardqr/support`, `/meteopen/support`, `/cupids-oracle/support`
- `/privacy`, `/cookies`
- `/404`

### Spanish

- `/es`
- `/es/cardqr`, `/es/meteopen`, `/es/cupids-oracle`
- `/es/*/privacy`, `/es/*/support`
- `/es/privacy`, `/es/cookies`

## Content created

- Apps: CardQR, MeteOpen, Cupid’s Oracle (EN/ES)
- Legal/support docs per app + portal privacy/cookies
- Placeholder icons under `public/apps/*/icon-placeholder.svg`

## Placeholders / TODO

- Import approved CardQR privacy from Android `play-store/privacy-policy.md`
- Complete MeteOpen description, version, permissions, weather sources, privacy
- Complete Cupid’s Oracle version, description, support, data model, downloads
- Replace icon/screenshot/OG assets
- Confirm hosting provider, jurisdiction, legal responsible person in portal privacy
- Set `PUBLIC_GA_MEASUREMENT_ID` when ready

## Modal decision

Dedicated app pages were prioritized over a home-route modal for accessibility, no-JS support, indexing and back-button correctness.

## Tests

| Suite | Result |
| --- | --- |
| `pnpm lint` | Pass |
| `pnpm typecheck` | Pass (0 errors) |
| `pnpm test` | Pass (8 tests) |
| `pnpm build` | Pass (25 pages) |
| `pnpm test:e2e` | Pass (9 tests) |

E2E coverage includes home, cards, detail routes, language switch, theme switch, CardQR privacy/support, coming-soon store text, consent gating for GA4, keyboard skip link, 404.

## Lighthouse

Not executed in this environment (no automated Lighthouse run). Architecture targets Performance/A11y/BP/SEO ≥ 95: static HTML, minimal JS, local/system fonts, explicit image dimensions, lazy screenshots, CSP/security headers.

## Headers / SEO / a11y / GA4

- Cloudflare `_headers`: CSP, nosniff, referrer, permissions, frame denial
- SEO: unique titles/descriptions, canonical, hreflang, OG/Twitter, sitemap, robots, JSON-LD `SoftwareApplication`
- A11y: skip link, focus styles, keyboard nav, reduced motion, status text+badge (not color-only), contrast-oriented tokens, light/dark + `prefers-color-scheme`
- GA4: loads only after accept; reject equally available; works with empty measurement ID

## Deployment instructions

See `docs/DEPLOYMENT.md`.

Primary host: **Cloudflare Pages**

Build: `pnpm build` → output `dist`

## Commands to create the GitHub repository

Account verified as `jowy81`. Run only after final review:

```bash
gh auth status
# Confirm: Logged in to github.com account jowy81

git branch -M main
gh repo create jowy81/apps-0xvera-landing --public --source=. --remote=origin --description "Official 0xVera apps catalog (apps.0xvera.com)"
git push -u origin main
```

If the repo is created empty in the UI instead:

```bash
git remote add origin https://github.com/jowy81/apps-0xvera-landing.git
git push -u origin main
```

## Commands to configure `apps.0xvera.com`

1. Cloudflare Pages → Create project from `jowy81/apps-0xvera-landing`
2. Build command: `pnpm build`
3. Output directory: `dist`
4. Node: `22`
5. Env vars from `.env.example`
6. Custom domain: `apps.0xvera.com`
7. Enable HTTPS; then enable HSTS at zone edge
8. Verify:
   - `https://apps.0xvera.com/`
   - `https://apps.0xvera.com/cardqr/privacy`
   - `https://apps.0xvera.com/robots.txt`
   - `https://apps.0xvera.com/sitemap-index.xml`

## Blockers before deploy declaration

1. Final CardQR privacy policy not imported
2. Incomplete product claims for MeteOpen / Cupid’s Oracle
3. Legal/hosting placeholders unresolved
4. Store assets unfinished
5. Repository not yet published / domain not attached

## Identity note

Public identity used throughout: **0xVera** (developer identity, not presented as a registered company/legal entity).
