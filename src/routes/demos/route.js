const allRequests = [
    { id: 1, slug: 'webdemos', title: 'Various web demos' },
    { id: 2, slug: 'webdemos/snake', title: 'Snake game' },
    { id: 3, slug: 'webdemos/opl3', title: 'OPL3 lib usage' },
];

module.exports = {
    template: 'Demos.svelte',
    permalink: '/:slug',
    all: ({ data }) => allRequests,
    data: async ({ request, data, helpers }) => {

        return {
            ...data,
            page: {
                allRequests: allRequests.map(e => ({...e, permalink: helpers.permalinks.demos({ slug: e.slug })}))
            }
        }
    },
};
