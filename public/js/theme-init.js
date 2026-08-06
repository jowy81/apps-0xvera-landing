(function () {
  try {
    var key = 'oxvera-theme';
    var stored = localStorage.getItem(key);
    var theme = stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var resolved = theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;
    document.documentElement.setAttribute('data-theme', resolved);
    document.documentElement.dataset.themePreference = theme;
  } catch (_error) {
    // Fail silently; CSS prefers-color-scheme remains as fallback.
  }
})();
