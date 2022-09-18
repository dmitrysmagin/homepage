require('dotenv').config();
const alias = require('@rollup/plugin-alias');

const { getRollupConfig } = require('@elderjs/elderjs');
const svelteConfig = require('./svelte.config');
const replacements = {
    preventAssignment: true, // Shut warnings
    'process.env.LIVE_UPDATE': JSON.stringify(process.env.LIVE_UPDATE),
}
const rollupConfig = getRollupConfig({ svelteConfig, replacements });

rollupConfig.forEach((config) => {
    // Shut down the warning about rewriting 'this' to 'undefined' by rollup
    config.context = 'this';
    config.plugins.unshift(alias({
        resolve: ['.svelte', '.js'],
        entries: [
            { find: 'src', replacement: `${process.cwd()}/src` },
            { find: '@', replacement: `${process.cwd()}/src` },
            { find: '@components', replacement: `${process.cwd()}/src/components` },
        ]
    }));
});

//console.dir(rollupConfig, {depth: null})
module.exports = [...rollupConfig];
