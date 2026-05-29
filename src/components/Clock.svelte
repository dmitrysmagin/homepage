<script>
    import { onMount } from "svelte";

    let time = new Date();

    // these automatically update when `time`
    // changes, because of the `$:` prefix
    $: hours = time.getHours();
    $: minutes = time.getMinutes();
    $: seconds = time.getSeconds();

    onMount(() => {
        const interval = setInterval(() => {
            time = new Date();
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });
</script>

<svg viewBox="-50 -50 100 100" class="w-full h-full">
    <circle class="stroke-gray-800 fill-white" r="48" />

    <!-- markers -->
    {#each [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55] as minute}
        <line class="major stroke-gray-800" y1="35" y2="45" transform="rotate({30 * minute})" />

        {#each [1, 2, 3, 4] as offset}
            <line
                class="minor stroke-gray-400"
                y1="42"
                y2="45"
                transform="rotate({6 * (minute + offset)})"
            />
        {/each}
    {/each}

    <!-- hour hand -->
    <line
        class="hour stroke-gray-800"
        y1="2"
        y2="-20"
        transform="rotate({30 * hours + minutes / 2})"
    />

    <!-- minute hand -->
    <line
        class="minute stroke-gray-500"
        y1="4"
        y2="-30"
        transform="rotate({6 * minutes + seconds / 10})"
    />

    <!-- second hand -->
    <g transform="rotate({6 * seconds})">
        <line class="second stroke-red-700" y1="10" y2="-38" />
        <line class="second-counterweight stroke-red-700" y1="10" y2="2" />
    </g>
</svg>

<style>
    .minor { stroke-width: 0.5; }
    .second-counterweight { stroke-width: 3; }
</style>
