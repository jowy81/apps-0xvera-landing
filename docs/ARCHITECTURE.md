# Architecture

## Overview

The site is a fully static Astro application. All app metadata and legal pages are validated at build time through Content Collections. There is no runtime backend.

## Key decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Framework | Astro static | SEO-friendly HTML, minimal JS |
| UI runtime | Astro components only | No React/Vue needed |
| Styling | Custom CSS tokens | Controllable brand system without Tailwind |
| Content | Markdown collections + Zod | Typed, fail-closed content |
| i18n | Astro i18n routing (`en` default, `/es`) | Clean localized URLs |
| App presentation | Dedicated pages (no route modal) | Accessibility and no-JS reliability first |
| Hosting | Cloudflare Pages + `public/_headers` | Static hosting under Cloudflare DNS |
| Analytics | Consent-gated GA4 | No cookies before accept |

## Request flow

1. Build reads `src/content/apps` and `src/content/legal`.
2. Zod schema validation fails the build on invalid status/fields.
3. Pages are generated for EN and ES routes.
4. Client scripts (`/js/theme-init.js`, `/js/site.js`) handle theme and consent only.

## i18n

- Canonical language: English (`/`)
- Spanish: `/es/...`
- Shared UI strings: `src/config/ui.ts`
- Localized app/legal bodies: parallel content files (`*.en.md`, `*.es.md`)
- `hreflang`, canonical and Open Graph locale set in `BaseHead`

## Security headers

Configured for Cloudflare Pages via `public/_headers`:

- CSP (`frame-ancestors 'none'`)
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`
- `X-Frame-Options: DENY`

HSTS should be enabled at the Cloudflare edge in production (see deployment docs). Do not duplicate incompatible Vercel header config.

## Modal decision

A shareable modal-over-home pattern was evaluated and deferred. Dedicated app URLs already satisfy deep-linking, indexing, back-button behaviour and no-JS access with far less accessibility risk.
