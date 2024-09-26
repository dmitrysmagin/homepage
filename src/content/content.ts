import { z, defineCollection } from 'astro:content';

const postsCollection = defineCollection({
    type: 'content', // v2.5.0 and later
    schema: z.object({
        title: z.string(),
        author: z.string(),
        published: z.string(),
        tags: z.array(z.string()),
    }),
});

export const collections = {
    'posts': postsCollection,
};
