import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLocale, type Locale } from '@/config/site';

export type LegalEntry = CollectionEntry<'legal'>;

export async function getLegalDoc(
  appSlug: string,
  type: LegalEntry['data']['type'],
  locale: Locale,
): Promise<{ entry: LegalEntry; usedFallback: boolean } | undefined> {
  const localized = await getCollection(
    'legal',
    ({ data }) => data.appSlug === appSlug && data.type === type && data.locale === locale,
  );
  if (localized[0]) {
    return { entry: localized[0], usedFallback: false };
  }

  if (locale === defaultLocale) return undefined;

  const fallback = await getCollection(
    'legal',
    ({ data }) =>
      data.appSlug === appSlug && data.type === type && data.locale === defaultLocale,
  );
  if (!fallback[0]) return undefined;
  return { entry: fallback[0], usedFallback: true };
}
