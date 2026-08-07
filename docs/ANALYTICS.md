# Analytics (GA4)

## Behaviour

- GA4 is optional.
- If `PUBLIC_GA_MEASUREMENT_ID` is empty, no banner errors occur and no GA script is loaded.
- GA4 loads only after the user accepts analytics.
- Reject is equally prominent.
- Choice is stored in `localStorage` key `oxvera-analytics-consent` (`accepted` | `rejected`).
- Users can reopen the banner via **Manage analytics** in the footer.
- The site remains fully usable without accepting.

## Implementation

- Measurement ID is exposed as `data-ga-id` on `<html>` when configured.
- Client logic lives in `public/js/site.js`.
- Script tag id: `ga4-script`.

## Events

| Event | When | Parameters |
| --- | --- | --- |
| `app_card_open` | App card / detail entry link clicked | legacy |
| `store_link_click` | Play / App Store link clicked | legacy |
| `privacy_link_click` | Privacy link clicked | legacy |
| `support_link_click` | Support link clicked | legacy |
| `language_change` | Language select changed | `language` |
| `theme_change` | Theme select changed | legacy |
| `outbound_link_click` | External link clicked | legacy |
| `consent_update` | User accepted analytics | legacy |
| `feedback_language_selected` | EN/ES feedback form opened | `language`, `app`, `source` |
| `feedback_open` | Feedback entry opened (form or app detail) | `language`, `app`, `source` |
| `tester_group_open` | Android Testers join CTA | `source` |
| `tester_feedback_open` | Feedback link from `/testers` | `source` |

## Never send

- Email addresses
- Support message text
- Personal data
- Sensitive URL query contents
- Google Form / Group IDs as event payloads
- Unnecessary identifiers beyond GA defaults after consent

## Privacy docs

Portal policy: `/privacy`  
Cookies notice: `/cookies`
