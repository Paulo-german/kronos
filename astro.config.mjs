// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import keystatic from "@keystatic/astro";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://www.kronoshub.com.br",
  security: {
    checkOrigin: false
  },
  integrations: [react(), mdx(), keystatic(), sitemap()],
  output: "server",
  adapter: vercel(),
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
