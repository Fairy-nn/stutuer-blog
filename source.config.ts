import { transformerRemoveNotationEscape } from '@shikijs/transformers';
import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins';
import {
  defineCollections,
  defineConfig,
  frontmatterSchema,
} from 'fumadocs-mdx/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { z } from 'zod';

export const blog = defineCollections({
  type: 'doc',
  dir: 'content',
  schema: frontmatterSchema.extend({
    date: z
      .string()
      .or(z.date())
      .transform((value, context) => {
        try {
          return new Date(value);
        } catch {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Invalid date',
          });
          return z.NEVER;
        }
      }),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    keywords: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
  }),
});

export default defineConfig({
  lastModifiedTime: 'git',
  mdxOptions: {
    rehypeCodeOptions: {
      inline: 'tailing-curly-colon',
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        transformerRemoveNotationEscape(),
      ],
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: (v) => [rehypeKatex, ...v],
  },
});
