# Content model

## Collections

Defined in `src/content.config.ts`.

### `apps`

Files: `src/content/apps/<slug>.<locale>.md`

Required fields include `slug`, `locale`, `name`, `developer`, `status`, `platforms`, `price`, booleans for ads/analytics/account, `shortDescription`, `icon`, `privacyUrl`, `supportUrl`, `featured`, `order`, `tags`.

`status` enum:

- `available`
- `coming-soon`
- `beta-testing`
- `in-development`
- `unavailable`

Optional fields are omitted from the UI when empty (version, screenshots, store URLs, `worksOffline`, etc.).

`incomplete: true` shows a public “details pending” notice without inventing product claims.

### `legal`

Files: `src/content/legal/<app-or-portal>/<type>.<locale>.md`

Types:

- `privacy`
- `support`
- `terms`
- `cookies`
- `portal-privacy`

`draft: true` adds `noindex,nofollow` and a visible draft notice.

## Rendering rules

- Missing optional metadata is not shown as “Unknown”.
- Coming-soon Android apps without `playStoreUrl` show localized “Coming soon on Google Play” text, not a fake store button.
- External privacy URLs (for example Cupid's Oracle) are linked as-is.
