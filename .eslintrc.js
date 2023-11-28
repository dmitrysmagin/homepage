// https://codechips.me/eslint-svelte-typescript/ has lots of errors, better use official
// https://www.npmjs.com/package/eslint-plugin-svelte
module.exports = {
    //root: true,
    parser: '@typescript-eslint/parser',
    env: {
        browser: true,
        node: true,
        commonjs: false,
        es2020: true,
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:svelte/recommended',
        'plugin:@typescript-eslint/recommended',
        //'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ],
    globals: {
        window: true,
        gtag: true,
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        //tsconfigRootDir: __dirname,
        //project: ['./tsconfig.json'],
        extraFileExtensions: ['.svelte'],
    },
    overrides: [{
        files: ['*.svelte'],
        parser: 'svelte-eslint-parser',
        parserOptions: {
            parser: "@typescript-eslint/parser",
        },
        rules: {
            'no-console': ['error'],
            'quotes': ["error", "double", { "allowTemplateLiterals": true }],
        }
    }],
    rules: {
        'semi': ['error', 'always'],
        'no-var': ['off'],
        'no-console': ['warn'],
        'no-unused-vars': ['off'],
        'no-mixed-spaces-and-tabs': ['warn'],
        'node/no-unpublished-require': ['off'],
        'indent': ['warn', 4],
        'quotes': 'off',
        'no-static-element-interactions': 'off',
        'click-events-have-key-events': 'off',
        'svelte/no-at-html-tags': 'off',
        'svelte/valid-compile': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
    },
};
