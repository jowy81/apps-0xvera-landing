import { describe, expect, it } from 'vitest';
import { absoluteUrl, alternatePath, localizedPath, stripLocalePrefix } from '../../src/lib/paths';

describe('localizedPath', () => {
  it('keeps English unprefixed', () => {
    expect(localizedPath('en', '/')).toBe('/');
    expect(localizedPath('en', '/cardqr')).toBe('/cardqr');
  });

  it('prefixes Spanish routes', () => {
    expect(localizedPath('es', '/')).toBe('/es');
    expect(localizedPath('es', '/cardqr/privacy')).toBe('/es/cardqr/privacy');
  });
});

describe('stripLocalePrefix', () => {
  it('removes Spanish prefix', () => {
    expect(stripLocalePrefix('/es')).toBe('/');
    expect(stripLocalePrefix('/es/cardqr')).toBe('/cardqr');
  });

  it('leaves English paths intact', () => {
    expect(stripLocalePrefix('/cardqr')).toBe('/cardqr');
  });
});

describe('alternatePath', () => {
  it('maps between locales', () => {
    expect(alternatePath('es', '/cardqr')).toBe('/es/cardqr');
    expect(alternatePath('en', '/es/cardqr')).toBe('/cardqr');
  });
});

describe('absoluteUrl', () => {
  it('joins site and path', () => {
    expect(absoluteUrl('https://apps.0xvera.com', '/cardqr')).toBe(
      'https://apps.0xvera.com/cardqr',
    );
  });
});
