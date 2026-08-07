/**
 * Public community endpoints (Google Forms / Google Groups).
 * Override via PUBLIC_* env vars when needed.
 */

import type { Locale } from '@/config/site';
import { localizedPath } from '@/lib/paths';

export type FeedbackFormLocale = 'en' | 'es';

export type FeedbackFormsConfig = {
  default: string;
  /** Optional prefilled form URLs per app slug (future). */
  apps?: Record<string, string>;
};

const feedbackEnDefault =
  import.meta.env.PUBLIC_FEEDBACK_FORM_EN_URL || 'https://forms.gle/rDJejNbbtEAYPjg78';
const feedbackEsDefault =
  import.meta.env.PUBLIC_FEEDBACK_FORM_ES_URL || 'https://forms.gle/eRchfcADmMfuPhLJ8';

export const communityConfig = {
  feedback: {
    en: {
      default: feedbackEnDefault,
      apps: {} as Record<string, string>,
    } satisfies FeedbackFormsConfig,
    es: {
      default: feedbackEsDefault,
      apps: {} as Record<string, string>,
    } satisfies FeedbackFormsConfig,
  },
  testers: {
    /**
     * Public Google Groups URL (join/request access).
     * Override via PUBLIC_ANDROID_TESTERS_GROUP_URL.
     */
    googleGroupUrl:
      import.meta.env.PUBLIC_ANDROID_TESTERS_GROUP_URL ||
      'https://groups.google.com/g/0xvera-android-testers',
    groupEmail: '0xvera-android-testers@googlegroups.com',
    groupName: '0xVera Android Testers',
  },
  contact: {
    supportEmail: import.meta.env.PUBLIC_SUPPORT_EMAIL || 'support@0xvera.com',
  },
} as const;

export function getTestersJoinHref(): string {
  const url = communityConfig.testers.googleGroupUrl.trim();
  if (url) return url;
  return `mailto:${communityConfig.testers.groupEmail}`;
}

export function hasTestersGroupUrl(): boolean {
  return Boolean(communityConfig.testers.googleGroupUrl.trim());
}

/** Known app slugs that may appear in ?app= */
export const feedbackAppSlugs = ['cardqr', 'meteopen', 'cupids-oracle'] as const;
export type FeedbackAppSlug = (typeof feedbackAppSlugs)[number];

export function isFeedbackAppSlug(value: string | null | undefined): value is FeedbackAppSlug {
  return Boolean(value && (feedbackAppSlugs as readonly string[]).includes(value));
}

export function getFeedbackFormUrl(
  formLocale: FeedbackFormLocale,
  appSlug?: string | null,
): string {
  const config = communityConfig.feedback[formLocale];
  if (appSlug && config.apps?.[appSlug]) {
    return config.apps[appSlug];
  }
  return config.default;
}

export function feedbackPageHref(locale: Locale, appSlug?: string | null): string {
  const base = localizedPath(locale, '/feedback');
  if (appSlug && isFeedbackAppSlug(appSlug)) {
    return `${base}?app=${encodeURIComponent(appSlug)}`;
  }
  return base;
}

/** Display names for known feedback app slugs (UI fallback). */
export const feedbackAppDisplayNames: Record<FeedbackAppSlug, string> = {
  cardqr: 'CardQR',
  meteopen: 'MeteOpen',
  'cupids-oracle': "Cupid's Oracle",
};
