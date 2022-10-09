<script>
    import '../style.css';
    export let templateHtml, data;
    //console.dir(data.allRequests, {depth: null})
</script>

<style lang="scss">
    .container {
        max-width: 900px;
        margin: 0 auto;
        padding: 1rem;
        overflow: hidden;
    }

    nav {
        text-align: center;
        border-top: 1px solid black;
        border-bottom: 1px solid black;

        .menu {
            display: flex;
            flex-direction: row;
            justify-content: center;

            li {
                display: block;
                color: #47549a;
                background-color: #f4f7fb;
                border-radius: 8px;
                transition: color 0.5s ease, background-color 0.5s ease;
                &:hover {
                    color: #ffffff;
                    background-color: #7b7b7b;
                }
            }
        }

        a, a:visited, a:link {
            display: block;
            color: inherit;
            text-decoration: none;
            padding: 8px 2em;
            cursor: pointer;
            user-select: none;
        }
    }


    .footer {
        padding: 2rem 0;
        background: #06395a;
        padding-top: 2rem;
        color: #f4f7fb;
        text-align: center;
        font-size: 14px;
    }
    .footer a {
        color: #f4f7fb;
    }
</style>

<header>
    <nav >
        <ul class="menu">
            <li><a class="menu-item" href="/">Home</a></li>
            <li><a class="menu-item" href="/games/">Games</a></li>
            <li><a class="menu-item" href="/posts/">Articles</a></li>
            <li><a class="menu-item" href="/webdemos/">Web Demos</a></li>
        </ul>
    </nav>
</header>

<main class="container">
    {@html templateHtml}
</main>

<footer class="footer">Built with ❤ and <a href="https://elderguide.com/tech/elderjs/">Elder.js</a></footer>
