require('dotenv').config();

const { getRollupConfig } = require('@elderjs/elderjs');
const svelteConfig = require('./svelte.config');
const replacements = {
    preventAssignment: true, // Shut warnings
    'process.env.LIVE_UPDATE': JSON.stringify(process.env.LIVE_UPDATE),
}
const rollupConfig = getRollupConfig({ svelteConfig, replacements });

// Shut down rewriting 'this' to 'undefined' by rollup
rollupConfig.forEach((config) => config.context='this');
//console.dir(rollupConfig, {depth: null})
module.exports = [...rollupConfig];
