import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLocale, type Locale } from '@/config/site';

export type AppEntry = CollectionEntry<'apps'>;

export async function getAppsByLocale(locale: Locale): Promise<AppEntry[]> {
  const localized = await getCollection('apps', ({ data }) => data.locale === locale);
  const apps =
    localized.length > 0
      ? localized
      : await getCollection('apps', ({ data }) => data.locale === defaultLocale);
  return apps.sort((a, b) => a.data.order - b.data.order);
}

export async function getAppBySlug(slug: string, locale: Locale): Promise<AppEntry | undefined> {
  const localized = await getCollection(
    'apps',
    ({ data }) => data.slug === slug && data.locale === locale,
  );
  if (localized[0]) return localized[0];

  if (locale === defaultLocale) return undefined;

  const fallback = await getCollection(
    'apps',
    ({ data }) => data.slug === slug && data.locale === defaultLocale,
  );
  return fallback[0];
}

export async function getAppSlugs(): Promise<string[]> {
  const apps = await getCollection('apps', ({ data }) => data.locale === defaultLocale);
  return apps.map((app) => app.data.slug);
}

export function resolveAppLink(url: string, locale: Locale): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  const path = url.startsWith('/') ? url : `/${url}`;
  if (locale === defaultLocale) {
    return path;
  }

  if (path === `/${locale}` || path.startsWith(`/${locale}/`)) return path;
  return `/${locale}${path}`;
}

export function toPublicPrivacyPath(slug: string, locale: Locale): string {
  return locale === defaultLocale ? `/${slug}/privacy` : `/${locale}/${slug}/privacy`;
}

export function toPublicSupportPath(slug: string, locale: Locale): string {
  return locale === defaultLocale ? `/${slug}/support` : `/${locale}/${slug}/support`;
}

export function toAppPath(slug: string, locale: Locale): string {
  return locale === defaultLocale ? `/${slug}` : `/${locale}/${slug}`;
}
