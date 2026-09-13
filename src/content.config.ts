import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const contentDate = z.union([z.string(), z.date()]).optional();

const common = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(['planned', 'active', 'published']),
  published: contentDate,
  updated: contentDate,
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  summary: z.string().optional(),
});

const experiments = defineCollection({
  loader: glob({ base: './src/content/experiments', pattern: '**/*.{md,mdx}' }),
  schema: common.extend({
    experimentNo: z.number(),
    eyebrow: z.string().optional(),
  }),
});

const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/*.{md,mdx}' }),
  schema: common.extend({
    category: z.string().optional(),
    eyebrow: z.string().optional(),
  }),
});

export const collections = { experiments, writing };
