 <script>
    const UNIQUEHASH = (Math.random() + 1).toString(36).substring(7);
 </script>

 <style global>
    #game {
        image-rendering: -moz-crisp-edges;
        image-rendering: -webkit-crisp-edges;
        image-rendering: pixelated;
        /*width: 600px;
        height: 600px;*/
        border: 2px solid purple;
        border-radius: 8px;
        margin-left: auto;
        margin-right: auto;
    }
 </style>

<svelte:head>
    <script src="/js/snake.js"></script>
</svelte:head>

<!-- Trick to force static script -->
<div hash={UNIQUEHASH} style="text-align: center;">
    <p>Press button to run js code!</p>
    <canvas width="400" height="400" id="game" style="display: none;"></canvas>
    <button id="button_run">RUN</button>
    <button id="button_stop" style="display: none;">STOP</button>
</div>

{#if true}
    <script hash={UNIQUEHASH}>
        (function() {
            const hash = document.currentScript.getAttribute('hash');
            const self = document.querySelector(`div[hash="${hash}"]`);

            var snake = new game(self.querySelector('#game'));

            var button_run = self.querySelector('#button_run');
            var button_stop = self.querySelector('#button_stop');

            button_run.addEventListener('click', function() {
                if (!snake.running) {
                    console.log(self)
                    snake.run();
                    button_run.style.display = 'none';
                    button_stop.style.display = null;
                }
            });

            button_stop.addEventListener('click', function() {
                if (snake.running) {
                    snake.stop();
                    console.log(self)
                    button_run.style.display = null;
                    button_stop.style.display = 'none';
                }
            });
        })();
    </script>
{/if}
