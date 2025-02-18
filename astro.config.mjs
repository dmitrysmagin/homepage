// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';

import robots from "./src/plugins/robots";

// Note: vite doesn't load .env here by default, need to do it manually
import { loadEnv } from "vite";
const env = loadEnv("", process.cwd(), "");
Object.assign(process.env, env);

// https://astro.build/config
export default defineConfig({
    //trailingSlash: "always",
    site: process.env.HTML_ROOT ?? 'http://localhost:4321/',
    integrations: [
        svelte(),
        sitemap(),
        robots(),
    ],
    build: {
        assets: '_astro',
        format: "directory",
        // 'auto' - only stylesheets smaller than ViteConfig.build.assetsInlineLimit
        // (default: 4kb) are inlined. Otherwise, project styles are sent in external stylesheets.
        inlineStylesheets: 'auto'
    },
    vite: {
        build: {
            assetsInlineLimit: 4096
        },
    }
});
