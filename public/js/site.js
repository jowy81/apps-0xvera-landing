(function () {
  var CONSENT_KEY = 'oxvera-analytics-consent';
  var THEME_KEY = 'oxvera-theme';

  function getConsent() {
    try {
      return localStorage.getItem(CONSENT_KEY);
    } catch (_error) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch (_error) {
      // ignore
    }
  }

  function getMeasurementId() {
    return document.documentElement.getAttribute('data-ga-id') || '';
  }

  function track(eventName, params) {
    if (typeof window.gtag !== 'function') return;
    if (getConsent() !== 'accepted') return;
    window.gtag('event', eventName, params || {});
  }

  function loadGa() {
    var id = getMeasurementId();
    if (!id) return;
    if (document.getElementById('ga4-script')) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', id, {
      anonymize_ip: true,
      send_page_view: true,
    });

    var script = document.createElement('script');
    script.id = 'ga4-script';
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(script);
  }

  function updateConsentUi() {
    var banner = document.getElementById('consent-banner');
    var consent = getConsent();
    var hasId = Boolean(getMeasurementId());
    if (!banner) return;
    if (!hasId) {
      banner.hidden = true;
      return;
    }
    banner.hidden = consent === 'accepted' || consent === 'rejected';
  }

  function acceptAnalytics() {
    setConsent('accepted');
    loadGa();
    updateConsentUi();
    track('consent_update', { consent_state: 'accepted' });
  }

  function rejectAnalytics() {
    setConsent('rejected');
    updateConsentUi();
  }

  function manageAnalytics() {
    try {
      localStorage.removeItem(CONSENT_KEY);
    } catch (_error) {
      // ignore
    }
    updateConsentUi();
    var banner = document.getElementById('consent-banner');
    if (banner) {
      banner.hidden = false;
      var accept = banner.querySelector('[data-consent="accept"]');
      if (accept instanceof HTMLElement) accept.focus();
    }
  }

  function resolveTheme(preference) {
    if (preference === 'light' || preference === 'dark') return preference;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function syncThemeToggle(resolved) {
    var button = document.getElementById('theme-toggle');
    if (!(button instanceof HTMLButtonElement)) return;
    var nextLabel =
      resolved === 'dark'
        ? button.getAttribute('data-label-light')
        : button.getAttribute('data-label-dark');
    if (nextLabel) button.setAttribute('aria-label', nextLabel);
    button.setAttribute('aria-pressed', resolved === 'dark' ? 'true' : 'false');
    button.dataset.theme = resolved;
  }

  function applyTheme(preference) {
    var resolved = resolveTheme(preference);
    document.documentElement.setAttribute('data-theme', resolved);
    document.documentElement.dataset.themePreference = preference;
    syncThemeToggle(resolved);
  }

  function initTheme() {
    var button = document.getElementById('theme-toggle');
    var stored = 'system';
    try {
      var value = localStorage.getItem(THEME_KEY);
      if (value === 'light' || value === 'dark' || value === 'system') stored = value;
    } catch (_error) {
      // ignore
    }
    applyTheme(stored);

    if (button) {
      button.addEventListener('click', function () {
        var current = resolveTheme(document.documentElement.dataset.themePreference || 'system');
        var next = current === 'dark' ? 'light' : 'dark';
        try {
          localStorage.setItem(THEME_KEY, next);
        } catch (_error) {
          // ignore
        }
        applyTheme(next);
        track('theme_change', { theme: next });
      });
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
      var preference = document.documentElement.dataset.themePreference || 'system';
      if (preference === 'system') applyTheme('system');
    });
  }

  function initConsent() {
    var banner = document.getElementById('consent-banner');
    if (!banner) return;

    banner.addEventListener('click', function (event) {
      var target = event.target;
      if (!(target instanceof HTMLElement)) return;
      var action = target.getAttribute('data-consent');
      if (action === 'accept') acceptAnalytics();
      if (action === 'reject') rejectAnalytics();
    });

    var manage = document.getElementById('manage-analytics');
    if (manage) {
      manage.addEventListener('click', function (event) {
        event.preventDefault();
        manageAnalytics();
      });
    }

    if (getConsent() === 'accepted') {
      loadGa();
    }
    updateConsentUi();
  }

  function initAnalyticsHooks() {
    document.addEventListener('click', function (event) {
      var target = event.target;
      if (!(target instanceof Element)) return;
      var link = target.closest('a');
      if (!(link instanceof HTMLAnchorElement)) return;

      var eventName = link.getAttribute('data-analytics-event');
      if (eventName) {
        track(eventName, {
          link_url: link.href,
          app_slug: link.getAttribute('data-app-slug') || undefined,
          language: link.getAttribute('data-language') || undefined,
        });
      } else if (link.hostname && link.hostname !== window.location.hostname) {
        track('outbound_link_click', { link_url: link.href });
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initConsent();
    initAnalyticsHooks();
  });
})();
