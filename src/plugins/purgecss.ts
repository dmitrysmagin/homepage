import type { AstroIntegration } from 'astro';
import { PurgeCSS, type UserDefinedOptions } from 'purgecss';

import { fileURLToPath } from 'node:url';
import { writeFile } from 'node:fs/promises';

// Clean from extra slash on windows and trailing forward slash on non-windows
export function cleanPath(file: URL): string {
    let path = fileURLToPath(file);

    // Remove trailing forward slash if present
    path = path.replace(/\/+$/, '');

    if (process.platform !== 'win32') return path;

    // Remove leading forward slash if present
    return path.replace(/^\/+/, '');
}

export interface PurgeCSSOptions extends Partial<UserDefinedOptions> { }

function Plugin(options: PurgeCSSOptions = {}): AstroIntegration {
    return {
        name: 'local-purgecss-simple',
        hooks: {
            'astro:build:done': async ({ dir, logger }) => {
                logger.info('Generating purged css files...');

                const outDir = cleanPath(dir);
                const purged = await new PurgeCSS().purge({
                    css: [`${outDir}/**/*.css`],
                    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
                    ...options,
                    content: [
                        `${outDir}/**/*.html`,
                        `${outDir}/**/*.js`,
                        ...(options.content || [])
                    ]
                });

                await Promise.all(
                    purged
                        .filter(({ file }) => file?.endsWith('.css'))
                        .map(async ({ css, file }) => {
                            await writeFile(file as string, css);
                            logger.info(file as string);
                        })
                );
            }
        }
    };
}

export default Plugin;
