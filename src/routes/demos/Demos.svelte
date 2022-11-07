<script>
    import Snake from '@components/Snake.svelte';

    export let data, request;
    const demos = data.page.allRequests.filter(e => e.id > 1);

    //console.dir(data.page.allRequests, {depth: null})
</script>

<style>
</style>

<svelte:head>
    <title>{request.title || 'Default page'}</title>
</svelte:head>

{#if request.id === 1}
    <div>Index</div>
    <ul>
        {#each demos as entry}
            <li><a href={entry.permalink}>{entry.title}</a></li>
        {/each}
    </ul>
{:else if request.id === 2}
    <Snake />
{:else if request.id === 3}
    <div>TODO</div>
{/if}
