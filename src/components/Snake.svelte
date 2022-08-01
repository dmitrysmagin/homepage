 <script>
    const UNIQUEHASH = (Math.random() + 1).toString(36).substring(7);
 </script>

<svelte:head>
    <script src="/js/snake.js"></script>
</svelte:head>

<!-- Trick to force static script -->
<div hash={UNIQUEHASH}>
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
