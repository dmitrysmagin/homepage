// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import compress from "@playform/compress";

// Custom integrations
import purgecss from './src/plugins/purgecss';
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
        react(),
        sitemap(),
        robots(),
        purgecss({
            fontFace: false,
            css: ["vanilla-cookieconsent/dist/cookieconsent.css"],
            keyframes: true,
            content: ["./src/**/*.{svelte,astro,html}"],
            safelist: { greedy: [/svelte-/] },
            blocklist: ['usedClass', /^nav-/],
            extractors: [
                {
                    extractor: (content) => [
                        ...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
                        ...(content.match(/(?<=class:)[^=>\/\s]*/g) || []),
                    ],
                    extensions: ["svelte", "astro", "html"],
                },
            ],
        }),
        compress({
            CSS: false,
            HTML: {
                "html-minifier-terser": {
                    removeAttributeQuotes: false,
                    collapseWhitespace: true,
                    decodeEntities: true,
                    html5: true,
                    ignoreCustomComments: [/^#/],
                    minifyCSS: true,
                    minifyJS: {
                        parse: {
                            bare_returns: false,
                            module: true,
                        },
                        compress: true,
                        mangle: true,
                        quote_style: 3,
                    },
                    processConditionalComments: true,
                    removeComments: true,
                    useShortDoctype: true,
                },
            },
            Image: false,
            JavaScript: false,
            SVG: false,
        }),
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
