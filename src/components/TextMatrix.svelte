<script>
    export let width = 10, height = 10;

    let matrix = Array(height).fill(0)
        .map((x, cellrow) => Array(width).fill(0)
            .map((e, cellcol) => ({
                row: cellrow,
                col: cellcol,
                contents: "&nbsp;",
                element: null
            })));

    ///console.dir(matrix, { depth: null })

    export function printAscii(x, y, text) {
        if (typeof text != "string") return;

        for (let i = 0; i < text.length; i++) {
            let dst = matrix[y][i + x];
            const symbol = text[i] !== " " ? text[i] : "&nbsp;";
            if (dst) {
                dst.contents = symbol;
            }
            if (dst && dst.element && dst.element.innerHTML) {
                dst.element.innerHTML = dst.contents;
            }
        }
    }

    printAscii(0, 0, "╭──────╮");
    printAscii(0, 1, "│╱┤DLiB│");
    printAscii(0, 2, "┏━━━━┳━STATUS▪▫▪ PPP│");
    printAscii(0, 3, "┃▸00◂┃G-1 2B ▪▪▪ 203│");
    printAscii(0, 4, "┃ 01 ┃··· •• ▪▪▪ 203│");
</script>

<div class="font-['Consolas',monospace] text-lg leading-normal text-center">
    {#each matrix as row}
        {#each row as col}
            <span class="transition-colors duration-[400ms] ease-in text-yellow-200 bg-[#6e8bb1] hover:bg-red-600" bind:this={col.element}>{@html col.contents}</span>
        {/each}
        <br/>
    {/each}
</div>
