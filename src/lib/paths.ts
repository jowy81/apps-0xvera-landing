import { defaultLocale, type Locale } from '@/config/site';

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

export function stripLocalePrefix(pathname: string): string {
  if (pathname === '/es' || pathname.startsWith('/es/')) {
    const rest = pathname.slice(3);
    return rest.length === 0 ? '/' : rest;
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
