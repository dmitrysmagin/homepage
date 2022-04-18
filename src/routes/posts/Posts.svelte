<script>
    export let data, request, settings;
    const post = data.markdown.posts.find(e => e.slug === request.slug);
    let title = post && post.frontmatter ? post.frontmatter.title : 'Table of contents';
    //console.log(post)
</script>

<style>
</style>

<svelte:head>
    <title>{title}</title>
    <link href="{settings.origin}{request.permalink}" rel="canonical" />
</svelte:head>

{#if !post} <!-- Front page with the table of contents -->
    <p>
        Some of these articles were written for <a href="http://a320.emulate.su">a320.emulate.su</a> in 2012-2016
        during the boom of cheap Dingux-based handhelds. Unfortunately, the site was abandoned since January 2019,
        so putting the information here for safety.
    </p>
    <ul>
        {#each data.markdown.posts as item}
        {@const published = new Date(item.frontmatter.published).toISOString().substring(0, 10)}
            <li><em>{published}</em> - <a href={'/' + item.slug}>{item.frontmatter.title}</a> - by <em>{item.frontmatter.author}</em></li>
        {/each}
    </ul>
{:else if post.html}
    <div id="content">
        {@html post.html}
    </div>
{:else}
    <div>Oops, nothing to show :(</div>
{/if}


<!-- Hint: wrap <script> into a directive to trick Svelte to insert it into the html -->
{#if true}
    <!--script>
        function route(e) {
            // TODO: add more error-checking
            window.location.hash.slice(1).length && showMD('/posts/' + window.location.hash.slice(1));
            // clear # from url
            //history.pushState(null, null, ' ');
        }

        window.addEventListener('hashchange', route);
        window.addEventListener('load', route);

        function showMD(mdPath) {
            fetch(mdPath)
                .then((response) => {
                    if (!response.ok) throw new Error('not ok');
                    response.text().then((text) => {
                        document.getElementById('content').innerHTML = marked(text);
                    });
                })
                .catch((error) => {
                    console.error('Fetch error:', error);
                    document.getElementById('content').innerHTML = '';
                    window.location.hash = '';
                    window.history.pushState(null, null, ' ');
                });
        }
    </script-->
{/if}
