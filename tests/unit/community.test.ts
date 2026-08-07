import { describe, expect, it } from 'vitest';
import {
  feedbackPageHref,
  getFeedbackFormUrl,
  getTestersJoinHref,
  isFeedbackAppSlug,
} from '../../src/config/community';

describe('community config', () => {
  it('resolves default EN and ES feedback form URLs', () => {
    expect(getFeedbackFormUrl('en')).toMatch(/^https:\/\//);
    expect(getFeedbackFormUrl('es')).toMatch(/^https:\/\//);
    expect(getFeedbackFormUrl('en')).not.toBe(getFeedbackFormUrl('es'));
  });

  it('validates known feedback app slugs', () => {
    expect(isFeedbackAppSlug('cardqr')).toBe(true);
    expect(isFeedbackAppSlug('meteopen')).toBe(true);
    expect(isFeedbackAppSlug('cupids-oracle')).toBe(true);
    expect(isFeedbackAppSlug('unknown')).toBe(false);
    expect(isFeedbackAppSlug(null)).toBe(false);
  });

  it('builds localized feedback hrefs with optional app query', () => {
    expect(feedbackPageHref('en')).toBe('/feedback');
    expect(feedbackPageHref('en', 'cardqr')).toBe('/feedback?app=cardqr');
    expect(feedbackPageHref('es', 'cardqr')).toBe('/es/feedback?app=cardqr');
    expect(feedbackPageHref('en', 'not-an-app')).toBe('/feedback');
  });

  it('provides the Google Groups join URL for testers', () => {
    expect(getTestersJoinHref()).toBe('https://groups.google.com/g/0xvera-android-testers');
  });
});
