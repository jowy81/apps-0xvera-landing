import type { AppEntry } from './apps';
import { absoluteUrl } from './paths';
import type { Locale } from '@/config/site';

export function buildSoftwareApplicationJsonLd(
  app: AppEntry,
  locale: Locale,
  siteUrl: string,
  pageUrl: string,
) {
  const data = app.data;
  const offers =
    data.status === 'available' && data.price === 'free'
      ? {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
        }
      : data.status === 'available'
        ? {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
          }
        : {
            '@type': 'Offer',
            availability: 'https://schema.org/PreOrder',
          };

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: data.name,
    description: data.seoDescription || data.shortDescription,
    operatingSystem: data.platforms
      .map((platform) => {
        if (platform === 'android') return 'Android';
        if (platform === 'ios') return 'iOS';
        return 'Web';
      })
      .join(', '),
    applicationCategory: 'UtilitiesApplication',
    url: pageUrl,
    image: absoluteUrl(siteUrl, data.icon),
    author: {
      '@type': 'Organization',
      name: data.developer,
    },
    offers,
    inLanguage: locale,
  };

  if (data.version) {
    jsonLd.softwareVersion = data.version;
  }

  if (data.playStoreUrl) {
    jsonLd.downloadUrl = data.playStoreUrl;
  } else if (data.appStoreUrl) {
    jsonLd.downloadUrl = data.appStoreUrl;
  } else if (data.webUrl) {
    jsonLd.downloadUrl = data.webUrl;
  }

  return jsonLd;
}
