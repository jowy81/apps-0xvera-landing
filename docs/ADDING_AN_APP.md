# Adding an app

No visual component edits are required for a standard catalog entry.

## Steps

1. Add localized content files:

```text
src/content/apps/<slug>.en.md
src/content/apps/<slug>.es.md
```

2. Fill the frontmatter according to the schema in `src/content.config.ts`.
3. Add markdown body copy (keep claims verified).
4. Create assets:

```text
public/apps/<slug>/icon-placeholder.svg  # or final icon
public/apps/<slug>/screenshots/
```

5. Add legal/support docs as needed:

```text
src/content/legal/<slug>/privacy.en.md
src/content/legal/<slug>/privacy.es.md
src/content/legal/<slug>/support.en.md
src/content/legal/<slug>/support.es.md
```

6. Run:

```bash
pnpm typecheck
pnpm build
```

Invalid statuses or missing required fields fail the build.

## Tips

- Use `incomplete: true` while product details are unfinished.
- Omit optional fields instead of inventing values.
- For external privacy policies, set an absolute `privacyUrl`.
- Set `order` to control catalog sorting.
- Set `featured` for future highlighting logic.
- `feedbackEnabled` defaults to `true` (detail page “Give feedback” link).
- Set `testingUrl` only when a real Google Play closed-testing URL exists.
- To honour `/feedback?app=<slug>`, also register the slug in `src/config/community.ts` (`feedbackAppSlugs`).
