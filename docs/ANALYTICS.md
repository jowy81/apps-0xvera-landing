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

| Event | When |
| --- | --- |
| `app_card_open` | App card / detail entry link clicked |
| `store_link_click` | Play / App Store link clicked |
| `privacy_link_click` | Privacy link clicked |
| `support_link_click` | Support link clicked |
| `language_change` | Language select changed |
| `theme_change` | Theme select changed |
| `outbound_link_click` | External link clicked |
| `consent_update` | User accepted analytics |

## Never send

- Email addresses
- Support message text
- Personal data
- Sensitive URL query contents
- Unnecessary identifiers beyond GA defaults after consent

## Privacy docs

Portal policy: `/privacy`  
Cookies notice: `/cookies`
