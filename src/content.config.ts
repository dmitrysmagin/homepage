import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const postsCollection = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/posts" }),
    schema: z.object({
        title: z.string(),
        author: z.string(),
        published: z.any(),
        tags: z.string(),
    }),
});

export const collections = {
    'posts': postsCollection,
};
