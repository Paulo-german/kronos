// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import keystatic from "@keystatic/astro";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://kronos.com.br",
  integrations: [react(), mdx(), keystatic(), sitemap()],
  output: "server",
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
});
