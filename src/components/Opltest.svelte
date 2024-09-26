<script>
    import TextMatrix from "./TextMatrix.svelte";
    // This component should be hydrated
    import { onMount } from "svelte";

    let textMatrixInstance;

    let player, counter = "";

    function FileToArrayBuffer(file) {
        const fileReader = new FileReader();

        return new Promise((resolve, reject) => {
            fileReader.onerror = () => {
                fileReader.abort();
                reject(new Error('Problem parsing input file'))
            };

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.readAsArrayBuffer(file);
        });
    }

    async function loadFile(files) {
        if (files instanceof FileList && files.length) {
            var file = files[0];
            var data = await FileToArrayBuffer(file);

            player.play(data);
        }
    }

    onMount(() => {
        player = new OPL3.Player(null, { prebuffer: 3000, volume: 4 });

        /*player.on('progress', function() {
            counter = player.position + 'ms / ' + player.length + 'ms';
        });

        player.on('position', function(ms) {
            counter = ms + 'ms / ' + player.length + 'ms';
        });*/

        player.on("currentTime", (value) => {
            counter = `currentFrame: ${value.currentFrame}, currentTime: ${value.currentTime.toFixed(2)} s`;
        })

        textMatrixInstance.printAscii(0, 5, "From outside");
    });
</script>

<!-- svelte:head is not picked up by Astro correctly, inject scripts inside page.astro component -->
<!--svelte:head>
    <script id="opl3" type="text/javascript" src="/js/opl3.js"></script>
</svelte:head-->

<style>

</style>


<div>
    <h2>OPL3 emulation test</h2>
    <p>This is a demo of <a href="https://github.com/doomjs/opl3">Doomjs's OPL3 emulation engine.</a></p>
    <div>{counter}</div>
    <div>
        <label for="fileUpload">Select a file:</label>
        <input type="file" id="fileUpload" name="fileUpload"
            accept=".rad,.raw,.dro,.laa,.mus,.imf"
            on:change={(e) => loadFile(e.target.files)}
        >
    </div>
    <div>
        <button on:click={() => player.stop()}>Stop</button>
        <button on:click={() => player.pause()}>Pause</button>
        <button on:click={() => player.resume()}>Resume</button>
    </div>
</div>

<TextMatrix width={36} height={10} bind:this={textMatrixInstance}/>
