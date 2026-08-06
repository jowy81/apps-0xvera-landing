export const locales = ['en', 'es', 'ca', 'fr', 'de', 'it'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

/** Locales that have dedicated translated content files. Others fall back to English. */
export const contentLocales = ['en', 'es'] as const;
export type ContentLocale = (typeof contentLocales)[number];

export const localeMeta: Record<
  Locale,
  { label: string; nativeLabel: string; flag: string; ogLocale: string; htmlLang: string }
> = {
  en: {
    label: 'English',
    nativeLabel: 'English',
    flag: '/flags/gb.svg',
    ogLocale: 'en_US',
    htmlLang: 'en',
  },
  es: {
    label: 'Spanish',
    nativeLabel: 'Español',
    flag: '/flags/es.svg',
    ogLocale: 'es_ES',
    htmlLang: 'es',
  },
  ca: {
    label: 'Catalan',
    nativeLabel: 'Català',
    flag: '/flags/ca.svg',
    ogLocale: 'ca_ES',
    htmlLang: 'ca',
  },
  fr: {
    label: 'French',
    nativeLabel: 'Français',
    flag: '/flags/fr.svg',
    ogLocale: 'fr_FR',
    htmlLang: 'fr',
  },
  de: {
    label: 'German',
    nativeLabel: 'Deutsch',
    flag: '/flags/de.svg',
    ogLocale: 'de_DE',
    htmlLang: 'de',
  },
  it: {
    label: 'Italian',
    nativeLabel: 'Italiano',
    flag: '/flags/it.svg',
    ogLocale: 'it_IT',
    htmlLang: 'it',
  },
};

export const siteConfig = {
  name: '0xVera',
  developerIdentity: '0xVera Devs',
  domain: 'apps.0xvera.com',
  defaultTitle: {
    en: 'Apps by 0xVera',
    es: 'Apps de 0xVera',
    ca: 'Apps de 0xVera',
    fr: 'Apps par 0xVera',
    de: 'Apps von 0xVera',
    it: 'App di 0xVera',
  },
  defaultDescription: {
    en: 'Independent applications designed around utility, privacy and straightforward user experiences.',
    es: 'Aplicaciones independientes diseñadas en torno a la utilidad, la privacidad y una experiencia directa.',
    ca: 'Aplicacions independents pensades per a la utilitat, la privadesa i una experiència directa.',
    fr: 'Applications indépendantes conçues autour de l’utilité, de la confidentialité et d’une expérience simple.',
    de: 'Unabhängige Anwendungen mit Fokus auf Nutzen, Privatsphäre und klarer Bedienung.',
    it: 'Applicazioni indipendenti pensate per utilità, privacy ed esperienze semplici.',
  },
  supportEmail: import.meta.env.PUBLIC_SUPPORT_EMAIL || 'support@0xvera.com',
  contactEmail: import.meta.env.PUBLIC_CONTACT_EMAIL || 'hello@0xvera.com',
  siteUrl: import.meta.env.PUBLIC_SITE_URL || 'https://apps.0xvera.com',
  gaMeasurementId: import.meta.env.PUBLIC_GA_MEASUREMENT_ID || '',
} as const;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function isContentLocale(value: string): value is ContentLocale {
  return (contentLocales as readonly string[]).includes(value);
}

/** Non-default locales used for `/[lang]/...` routes. */
export const prefixedLocales = locales.filter((locale) => locale !== defaultLocale);
