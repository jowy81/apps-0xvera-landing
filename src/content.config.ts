import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const appStatus = z.enum(['available', 'coming-soon', 'in-development', 'unavailable']);
const platform = z.enum(['android', 'ios', 'web']);
const price = z.enum(['free', 'paid', 'freemium']);
const locale = z.enum(['en', 'es']);

const httpUrl = z.string().refine((value) => /^https?:\/\//.test(value), {
  message: 'Must be an absolute http(s) URL',
});

const apps = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/apps',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, '').replace(/\//g, '-'),
  }),
  schema: z.object({
    slug: z.string().min(1),
    locale,
    name: z.string().min(1),
    developer: z.string().min(1),
    status: appStatus,
    platforms: z.array(platform).min(1),
    version: z.string().optional(),
    updatedAt: z.coerce.date().optional(),
    minimumAndroid: z.string().optional(),
    minimumIos: z.string().optional(),
    price,
    hasAds: z.boolean(),
    hasAnalytics: z.boolean(),
    requiresAccount: z.boolean(),
    worksOffline: z.boolean().optional(),
    shortDescription: z.string().min(1),
    icon: z.string().min(1),
    screenshots: z.array(z.string()).optional(),
    playStoreUrl: httpUrl.optional(),
    appStoreUrl: httpUrl.optional(),
    webUrl: httpUrl.optional(),
    privacyUrl: z.string().min(1),
    supportUrl: z.string().min(1),
    termsUrl: z.string().optional(),
    deleteAccountUrl: z.string().optional(),
    repositoryUrl: httpUrl.optional(),
    featured: z.boolean(),
    order: z.number().int(),
    tags: z.array(z.string()),
    features: z.array(z.string()).optional(),
    permissions: z.array(z.string()).optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    incomplete: z.boolean().default(false),
  }),
});

const legal = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/legal',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, '').replace(/\//g, '-'),
  }),
  schema: z.object({
    appSlug: z.string().min(1),
    type: z.enum(['privacy', 'support', 'terms', 'cookies', 'portal-privacy']),
    locale,
    title: z.string().min(1),
    description: z.string().min(1),
    draft: z.boolean().default(false),
    updatedAt: z.coerce.date().optional(),
  }),
});


export const collections = { apps, legal };
