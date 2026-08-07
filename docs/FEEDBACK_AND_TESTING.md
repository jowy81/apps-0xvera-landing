# Feedback and Android Testers

Public community entry points on [apps.0xvera.com](https://apps.0xvera.com).

## Architecture

```text
apps.0xvera.com/feedback
        ↓
EN Form / ES Form (Google Forms)
        ↓
Google Apps Script (optional automation)
        ↓
All Feedback (Google Sheets)
```

```text
apps.0xvera.com/testers
        ↓
0xVera Android Testers (Google Group)
        ↓
Closed test programme per app (Google Play)
```

## Routes

| Path | Locales |
| --- | --- |
| `/feedback` | `en` (default), `/es/feedback`, `/ca/…`, `/fr/…`, `/de/…`, `/it/…` |
| `/testers` | same pattern |

Optional query on feedback:

```text
/feedback?app=cardqr
/feedback?app=meteopen
/feedback?app=cupids-oracle
```

Unknown `app` values are ignored (page still works with the generic title).

## Configuration

Central module: `src/config/community.ts`.

| Variable | Purpose |
| --- | --- |
| `PUBLIC_FEEDBACK_FORM_EN_URL` | English Google Form |
| `PUBLIC_FEEDBACK_FORM_ES_URL` | Spanish Google Form |
| `PUBLIC_ANDROID_TESTERS_GROUP_URL` | Public Google Groups join URL |
| `PUBLIC_SUPPORT_EMAIL` | Support address shown on the feedback page |

Defaults for the form URLs and the Google Group live in `community.ts` / `.env.example`.

Google Group URL (no `/about` suffix):

```text
https://groups.google.com/g/0xvera-android-testers
```

If `PUBLIC_ANDROID_TESTERS_GROUP_URL` is empty, the testers CTA falls back to `mailto:0xvera-android-testers@googlegroups.com`.

Do not hardcode Forms/Groups URLs in components — use `communityConfig` helpers.

## Per-app feedback links

App detail pages show **Give feedback** / **Enviar feedback** when `feedbackEnabled` is true (default).

The link goes to `/feedback?app=<slug>` (localized).

### Future prefilled form URLs

`getFeedbackFormUrl(locale, appSlug)` already supports:

```ts
communityConfig.feedback.en.apps.cardqr = 'https://forms.gle/...';
```

Populate `apps` maps in `src/config/community.ts` (or extend env loading) when prefilled links exist. Until then, EN/ES buttons open the general forms.

## Per-app closed testing CTA

App frontmatter may include:

```yaml
testingUrl: https://play.google.com/apps/testing/...
feedbackEnabled: true
```

`Join testing` is rendered only when `testingUrl` is set. Do not invent Play testing URLs.

## Google Group

- Name: **0xVera Android Testers**
- URL: https://groups.google.com/g/0xvera-android-testers
- Email: `0xvera-android-testers@googlegroups.com`

Membership is permanent community access, not automatic enrolment in every app test.

## Adding a new app to feedback

1. Add the app to the content collection as usual.
2. Add its slug to `feedbackAppSlugs` / `feedbackAppDisplayNames` in `src/config/community.ts` if it should honour `?app=`.
3. Optionally set `feedbackEnabled: false` to hide the detail-page link.
4. Later: add a prefilled form URL under `feedback.en.apps` / `feedback.es.apps`.

## Analytics

Events (only after analytics consent):

| Event | Parameters |
| --- | --- |
| `feedback_language_selected` | `language`, `app`, `source` |
| `feedback_open` | `language`, `app`, `source` |
| `tester_group_open` | `source` |
| `tester_feedback_open` | `source` |

Never send emails, form contents, full query strings, or Google account IDs.
