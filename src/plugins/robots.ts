import type { AstroIntegration } from "astro";

import { writeFileSync } from "node:fs";

const createPlugin = (): AstroIntegration => {

    return {
        name: "local-robots",
        hooks: {
            "astro:build:done": ({ dir, logger }) => {
                logger.info(`Creating robots.txt`);

                let root = process.env.HTML_ROOT || "";

                if (!root) {
                    logger.error("HTML_ROOT value is not set, aborting")
                }

                root = root.endsWith("/")
                    ? root.slice(0, -1)
                    : root;

                let host = root.startsWith("https://")
                    ? root.replace("https://", "")
                    : root;

                host = host.startsWith("http://")
                    ? host.replace("http://", "")
                    : host;

                const robotsTxtContent =
                    `User-agent: *\n` +
                    `Disallow: /_astro/\n\n` +
                    `User-agent: Googlebot\n` +
                    `Allow: /_astro/\n\n` +
                    `Sitemap: ${root}/sitemap-index.xml\n` +
                    `Host: ${host}`;

                writeFileSync(new URL("robots.txt", dir), robotsTxtContent);

                logger.info("Integration finished.");
            }
        }
    }
};

export { createPlugin as default };
