import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

const articles = defineCollection({
    loader: glob({ pattern: ["**/*.md", "**/*.mdx"], base: "./src/content/posts" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        cover: image(),
        coverAlt: z.string(),
        author: z.string(),
        summary: z.string(),
        category: z.string(),
        readingDuration: z.number(),
        tags: z.array(z.string()),
    }),
});

export const collections = { articles };
