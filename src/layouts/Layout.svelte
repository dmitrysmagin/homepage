<script>
    import '../style.css';
    export let templateHtml, data;
    //console.dir(data.allRequests, {depth: null})
</script>

<style>
    .container {
        max-width: 900px;
        margin: 0 auto;
        padding: 1rem;
        overflow: hidden;
    }

    .footer {
        padding: 2rem 0;
        background: #06395a;
        padding-top: 2rem;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
            'Helvetica Neue', sans-serif;
        color: #f4f7fb;
        text-align: center;
        font-size: 14px;
    }
    .footer a {
        color: #f4f7fb;
    }
</style>

<main class="container">
    {@html templateHtml}
</main>

<div class="footer">Built with ❤ and <a href="https://elderguide.com/tech/elderjs/">Elder.js</a></div>
