import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '@/config/site';

export type LegalEntry = CollectionEntry<'legal'>;

export async function getLegalDoc(
  appSlug: string,
  type: LegalEntry['data']['type'],
  locale: Locale,
): Promise<LegalEntry | undefined> {
  const docs = await getCollection(
    'legal',
    ({ data }) => data.appSlug === appSlug && data.type === type && data.locale === locale,
  );
  return docs[0];
}
