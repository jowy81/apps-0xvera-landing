import { describe, expect, it } from 'vitest';
import {
  absoluteUrl,
  alternatePath,
  getLocaleFromPathname,
  localizedPath,
  stripLocalePrefix,
} from '../../src/lib/paths';

describe('localizedPath', () => {
  it('keeps English unprefixed', () => {
    expect(localizedPath('en', '/')).toBe('/');
    expect(localizedPath('en', '/cardqr')).toBe('/cardqr');
  });

  it('prefixes non-default locales', () => {
    expect(localizedPath('es', '/')).toBe('/es');
    expect(localizedPath('ca', '/cardqr/privacy')).toBe('/ca/cardqr/privacy');
    expect(localizedPath('fr', '/')).toBe('/fr');
  });
});

describe('stripLocalePrefix', () => {
  it('removes known locale prefixes', () => {
    expect(stripLocalePrefix('/es')).toBe('/');
    expect(stripLocalePrefix('/ca/cardqr')).toBe('/cardqr');
    expect(stripLocalePrefix('/de/privacy')).toBe('/privacy');
  });

  it('leaves English paths intact', () => {
    expect(stripLocalePrefix('/cardqr')).toBe('/cardqr');
  });
});

describe('alternatePath / getLocaleFromPathname', () => {
  it('maps between locales', () => {
    expect(alternatePath('es', '/cardqr')).toBe('/es/cardqr');
    expect(alternatePath('en', '/es/cardqr')).toBe('/cardqr');
    expect(alternatePath('it', '/fr/cardqr')).toBe('/it/cardqr');
  });

  it('detects locale from pathname', () => {
    expect(getLocaleFromPathname('/ca/cardqr')).toBe('ca');
    expect(getLocaleFromPathname('/cardqr')).toBe('en');
  });
});

describe('absoluteUrl', () => {
  it('joins site and path', () => {
    expect(absoluteUrl('https://apps.0xvera.com', '/cardqr')).toBe(
      'https://apps.0xvera.com/cardqr',
    );
  });
});
