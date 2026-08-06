import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '@/config/site';

export type AppEntry = CollectionEntry<'apps'>;

export async function getAppsByLocale(locale: Locale): Promise<AppEntry[]> {
  const apps = await getCollection('apps', ({ data }) => data.locale === locale);
  return apps.sort((a, b) => a.data.order - b.data.order);
}

export async function getAppBySlug(slug: string, locale: Locale): Promise<AppEntry | undefined> {
  const apps = await getCollection(
    'apps',
    ({ data }) => data.slug === slug && data.locale === locale,
  );
  return apps[0];
}

export async function getAppSlugs(): Promise<string[]> {
  const apps = await getCollection('apps', ({ data }) => data.locale === 'en');
  return apps.map((app) => app.data.slug);
}

export function resolveAppLink(url: string, locale: Locale): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  const path = url.startsWith('/') ? url : `/${url}`;
  if (locale === 'en') {
    return path;
  }

  if (path.startsWith('/es/') || path === '/es') return path;
  return `/es${path}`;
}

export function toPublicPrivacyPath(slug: string, locale: Locale): string {
  return locale === 'en' ? `/${slug}/privacy` : `/es/${slug}/privacy`;
}

export function toPublicSupportPath(slug: string, locale: Locale): string {
  return locale === 'en' ? `/${slug}/support` : `/es/${slug}/support`;
}

export function toAppPath(slug: string, locale: Locale): string {
  return locale === 'en' ? `/${slug}` : `/es/${slug}`;
}
