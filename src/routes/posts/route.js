const path = require('path');
const glob = require('glob');

module.exports = {
    template: 'Posts.svelte',
    permalink: '/:slug',
    all: ({ data }) => [{ slug: 'posts/' }, ...data.markdown.posts.map(e => ({ slug: 'posts/' + e.slug + '/' }))],
    data: async ({ data, settings }) => {
        // Force call compileHTML here because plugin's hook doesn't recognize custom routes
        for (let post of data.markdown.posts) {
            if (!post.html) {
                await post.compileHtml();
                post.slug = 'posts/' + post.slug + '/';

                console.log(post.slug)
            }
        }

        //console.dir(data, {depth: null})

        return data;
    },
};
