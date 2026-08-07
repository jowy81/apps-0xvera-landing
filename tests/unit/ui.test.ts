import { describe, expect, it } from 'vitest';
import { t } from '../../src/config/ui';

describe('ui dictionary', () => {
  it('returns English and Spanish labels', () => {
    expect(t('en', 'hero.title')).toBe('Apps by 0xVera');
    expect(t('es', 'hero.title')).toBe('Apps de 0xVera');
  });

  it('falls back to English for missing keys', () => {
    expect(t('es', 'status.available')).toBe('Disponible');
    expect(t('en', 'missing.key')).toBe('missing.key');
  });

  it('exposes feedback and testers copy in English and Spanish', () => {
    expect(t('en', 'feedback.title')).toBe('App Feedback');
    expect(t('es', 'feedback.title')).toBe('Feedback de las apps');
    expect(t('en', 'testers.title')).toBe('Join 0xVera Android Testers');
    expect(t('es', 'testers.title')).toBe('Únete a 0xVera Android Testers');
    expect(t('es', 'app.giveFeedback')).toBe('Enviar feedback');
  });
});
