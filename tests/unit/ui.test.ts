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
});
