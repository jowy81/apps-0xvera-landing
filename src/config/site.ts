export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const siteConfig = {
  name: '0xVera',
  developerIdentity: '0xVera Devs',
  domain: 'apps.0xvera.com',
  defaultTitle: {
    en: 'Apps by 0xVera',
    es: 'Apps de 0xVera',
  },
  defaultDescription: {
    en: 'Independent applications designed around utility, privacy and straightforward user experiences.',
    es: 'Aplicaciones independientes diseñadas en torno a la utilidad, la privacidad y una experiencia directa.',
  },
  supportEmail: import.meta.env.PUBLIC_SUPPORT_EMAIL || 'support@0xvera.com',
  contactEmail: import.meta.env.PUBLIC_CONTACT_EMAIL || 'hello@0xvera.com',
  siteUrl: import.meta.env.PUBLIC_SITE_URL || 'https://apps.0xvera.com',
  gaMeasurementId: import.meta.env.PUBLIC_GA_MEASUREMENT_ID || '',
  ogLocale: {
    en: 'en_US',
    es: 'es_ES',
  },
} as const;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
