# apps.0xvera.com

Official public catalog of applications published or developed under the **0xVera Devs** identity.

Live target: `https://apps.0xvera.com`

## Purpose

- List applications and their availability status
- Provide per-app detail pages
- Host or link privacy and support pages suitable for store consoles
- Remain fully static: no database, CMS, auth or backend

## Stack

- Astro 7 (static output)
- TypeScript (strict)
- Native CSS with design tokens
- Astro Content Collections for apps and legal docs
- pnpm (`packageManager` pinned)
- Node 22 LTS (see `.nvmrc`)
- Vitest + Playwright
- Cloudflare Pages as primary host

## Install

```bash
pnpm install
```

Copy environment defaults:

```bash
cp .env.example .env
```

## Development

```bash
pnpm dev
```

## Build & preview

```bash
pnpm build
pnpm preview
```

## Quality checks

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
```

`pnpm test:e2e` expects a prior `pnpm build` (CI runs build first).

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `PUBLIC_SITE_URL` | Recommended | Canonical site URL (`https://apps.0xvera.com`) |
| `PUBLIC_SUPPORT_EMAIL` | Optional | Defaults to `support@0xvera.com` |
| `PUBLIC_CONTACT_EMAIL` | Optional | Defaults to `hello@0xvera.com` |
| `PUBLIC_GA_MEASUREMENT_ID` | Optional | GA4 ID; site works without it |

## Structure

```text
src/
├── components/
├── config/
├── content/
│   ├── apps/
│   └── legal/
├── layouts/
├── lib/
├── pages/
└── styles/
public/
├── apps/
├── js/
└── _headers
docs/
```

## Adding an app

See [docs/ADDING_AN_APP.md](docs/ADDING_AN_APP.md). Content lives in `src/content/apps/` — no component edits required for new catalog entries.

## App status (initial)

| App | Status | Notes |
| --- | --- | --- |
| CardQR | Coming soon | Privacy draft pending import from Android repo |
| MeteOpen | Coming soon | Placeholders for description/privacy/assets |
| Cupid's Oracle | Coming soon | External privacy at cupidsoracle.com |

## Deployment

Primary: **Cloudflare Pages** (static). See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Content model](docs/CONTENT_MODEL.md)
- [Analytics](docs/ANALYTICS.md)
- [Assets required](docs/ASSETS_REQUIRED.md)
- [Legal content](docs/LEGAL_CONTENT.md)
- [Implementation report](audit/IMPLEMENTATION_REPORT.md)

## Pending before production launch

- Import final CardQR privacy policy (`draft: false`)
- Complete MeteOpen and Cupid's Oracle product fields
- Replace icon/screenshot placeholders
- Confirm hosting/legal placeholders in portal privacy
- Set `PUBLIC_GA_MEASUREMENT_ID` only when ready
- Publish GitHub repository and attach custom domain
