import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import remarkMermaid from "./src/lib/remark-mermaid.js";

export default defineConfig({
  site: "https://rosekamal.com",
  output: "static",
  adapter: vercel({ webAnalytics: { enabled: true } }),
  integrations: [
    mdx(),
    react(),
    sitemap({
      filter: (page) => !page.includes("/api/"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [remarkGfm, remarkMermaid],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
          properties: { className: ["heading-anchor"], "aria-label": "Anchor link" },
          // Empty content — "#" is rendered via CSS pseudo-element so it
          // doesn't leak into Astro's `headings[].text` (used by the TOC).
          content: () => [],
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: { light: "github-light", dark: "github-dark" },
        },
      ],
    ],
    syntaxHighlight: false,
  },
});
