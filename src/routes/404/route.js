module.exports = {
    template: '404.svelte',
    all: () => [{ slug: '/404' }],
    permalink: ({ request }) => request.slug,
    data: ({ data }) => { },
};
