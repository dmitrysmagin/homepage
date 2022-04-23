<script>
    export let data, request, settings;
    const post = data.markdown.posts.find(e => e.slug === request.slug);
    let title = post && post.frontmatter ? post.frontmatter.title : 'Table of contents';
    //console.log(post)
</script>

<style lang="scss" global>
    #content {
        padding-left: 10px;
        padding-right: 10px;
        margin-right: 0;
        margin-left: 0;
        margin-top: 10px;
        margin-bottom: 10px;
        border: 1px solid #e1e4e8;
        border-radius: 6px;

        img {
            max-width: 600px;
            display: block;
            margin-left: auto;
            margin-right: auto;
            text-align: center;
        }

        h1, h2, h3, h4, h5, h6 {
            line-height: 1.1em;
            font-family: Lato, Helvetica, Arial, sans-serif;
        }

        p {
            margin-bottom: 1.2em;
            hyphens: auto;
            color: #333;
            text-align: justify;
        }

        pre {
            padding: 1em;
        }

        code, pre {
            background-color: #ddd;
        }

        h1 {
            font-size: 2.2em;
        }

        h2 {
            font-size: 1.5em;
            font-weight: normal;
        }

        table {
            margin-left: auto;
            margin-right: auto;
            border-spacing: 0;
            border-collapse: collapse;
        }

        table th, #content table td {
            padding: 6px 13px;
            border: 1px solid #c3c8cc;
        }

        table tr:nth-child(2n), table thead tr {
            background-color: #d4d9dd;
        }
    }
</style>

<svelte:head>
    <title>{title}</title>
    <link href="{settings.origin}{request.permalink}" rel="canonical" />
</svelte:head>

<section id="articles">
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
        <!-- TODO: Add header here -->
        <header></header>
        <article id="content">
            {@html post.html}
        </article>
    {:else}
        <div>Oops, nothing to show :(</div>
    {/if}
</section>


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
