<script lang="ts">

    interface Props {
        images: string[];
    }
    const { images }: Props = $props();
</script>

<div id="default-carousel" class="relative mb-4 mt-4 mx-auto max-w-[512px]" data-carousel="slide">
    <!-- Carousel wrapper -->
    <div class="overflow-hidden relative rounded-lg h-56 sm:h-82">
        {#each images as url }
            <div class="hidden duration-700 ease-in-out" data-carousel-item>
                <img
                    class="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
                    src={url} alt="screenshot" loading="lazy"/>
            </div>  
        {/each}
    </div>

    <!-- Slider indicators -->
    <div class="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
        {#each images as url, index }
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label={`Slide ${index+1}`} data-carousel-slide-to={`${index}`}></button>
        {/each}
    </div>

    <!-- Slider controls -->
    <button type="button" class="nav-button left-0 group" data-carousel-prev>
        <span class="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            <span class="hidden">Previous</span>
        </span>
    </button>
    <button type="button" class="nav-button right-0 group" data-carousel-next>
        <span class="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            <span class="hidden">Next</span>
        </span>
    </button>
</div>

<style lang="scss">
    @reference "src/styles/global.css";

    .nav-button {
        @apply flex absolute top-0 z-30 justify-center items-center px-4 h-full cursor-pointer focus:outline-none;
    }
</style>
