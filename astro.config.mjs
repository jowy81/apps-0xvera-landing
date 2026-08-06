// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.PUBLIC_SITE_URL || 'https://apps.0xvera.com';
const rootDir = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          es: 'es-ES',
          ca: 'ca-ES',
          fr: 'fr-FR',
          de: 'de-DE',
          it: 'it-IT',
        },
      },
      filter: (page) => !page.includes('/404'),
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'ca', 'fr', 'de', 'it'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    resolve: {
      alias: {
        '@': path.join(rootDir, 'src'),
      },
    },
    server: {
      watch: {
        ignored: ['**/audit/**', '**/docs/**'],
      },
    },
  },
});
