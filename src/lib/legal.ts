import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLocale, type Locale } from '@/config/site';

export type LegalEntry = CollectionEntry<'legal'>;

/**
 * Legal pages are English-only for now (privacy, cookies, support drafts).
 * UI can still be localized; legal content always resolves from `en`.
 */
export async function getLegalDoc(
  appSlug: string,
  type: LegalEntry['data']['type'],
  locale: Locale,
): Promise<{ entry: LegalEntry; usedFallback: boolean } | undefined> {
  const docs = await getCollection(
    'legal',
    ({ data }) =>
      data.appSlug === appSlug && data.type === type && data.locale === defaultLocale,
  );
  if (!docs[0]) return undefined;
  return { entry: docs[0], usedFallback: locale !== defaultLocale };
}
