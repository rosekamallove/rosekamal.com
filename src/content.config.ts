import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    status: z.enum(["active", "shipped", "archived", "acquired"]),
    stack: z.array(z.string()).optional(),
    url: z.string().url().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog, projects };
