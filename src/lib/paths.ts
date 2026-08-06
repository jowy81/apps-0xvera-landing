import { defaultLocale, isLocale, locales, type Locale } from '@/config/site';

/** Build a localized path. English (default) has no prefix. */
export function localizedPath(locale: Locale, path = '/'): string {
  const normalized = path === '/' ? '/' : path.startsWith('/') ? path : `/${path}`;

  if (locale === defaultLocale) {
    return normalized === '/' ? '/' : normalized.replace(/\/$/, '');
  }

  if (normalized === '/') {
    return `/${locale}`;
  }

  return `/${locale}${normalized}`.replace(/\/$/, '');
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split('/').filter(Boolean)[0];
  if (segment && isLocale(segment) && segment !== defaultLocale) {
    return segment;
  }
  return defaultLocale;
}

export function stripLocalePrefix(pathname: string): string {
  const segment = pathname.split('/').filter(Boolean)[0];
  if (segment && isLocale(segment) && segment !== defaultLocale) {
    const rest = pathname.slice(segment.length + 1);
    return rest.length === 0 ? '/' : rest.startsWith('/') ? rest : `/${rest}`;
  }
  return pathname || '/';
}

export function alternatePath(locale: Locale, pathname: string): string {
  return localizedPath(locale, stripLocalePrefix(pathname));
}

export function absoluteUrl(siteUrl: string, path: string): string {
  const base = siteUrl.replace(/\/$/, '');
  if (path === '/') return base;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function allLocaleAlternates(pathname: string): Record<Locale, string> {
  const bare = stripLocalePrefix(pathname);
  return Object.fromEntries(locales.map((locale) => [locale, localizedPath(locale, bare)])) as Record<
    Locale,
    string
  >;
}
