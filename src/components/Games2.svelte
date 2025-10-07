<script lang="ts">
    // https://codepen.io/knownji/pen/QwLGRBg?editors=1000

    import { Carousel } from "flowbite-svelte";

    const images = [
        {
            alt: "Screenshot 0",
            src: "/img/lastmission00.png",
        },
        {
            alt: "Screenshot 0",
            src: "/img/lastmission01.png",
        },
    ]

    const image_urls = [
        "/img/lastmission00.png",
        "/img/lastmission01.png",
        "/img/lastmission02.png",
        "/img/lastmission03.png",
        "/img/lastmission04.png",
        "/img/lastmission05.png"
    ];
</script>

<style>
    /*img {
        aspect-ratio: 320 / 200;
        object-fit: contain;
    }*/
</style>

<section class="max-w-3xl mx-auto">
    <div class="w-full">
        <div id="default-carousel" class="relative mb-4 mt-4 mx-auto max-w-[512px]" data-carousel="slide">
            <!-- Carousel wrapper -->
            <div class="overflow-hidden relative rounded-lg h-56 sm:h-94">
                {#each image_urls as url }
                    <div class="hidden duration-700 ease-in-out" data-carousel-item>
                        <img
                            class="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
                            src={url} alt="screenshot" loading="lazy"/>
                    </div>  
                {/each}
            </div>

            <!-- Slider indicators -->
            <div class="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
                {#each image_urls as url, index }
                <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label={`Slide ${index+1}`} data-carousel-slide-to={`${index}`}></button>
                {/each}
            </div>

            <!-- Slider controls -->
            <button type="button" class="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev>
                <span class="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                    <span class="hidden">Previous</span>
                </span>
            </button>
            <button type="button" class="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-next>
                <span class="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    <span class="hidden">Next</span>
                </span>
            </button>
        </div>
        <!--Carousel {images} duration={3000} /-->
        <div class="description">
            <h1>The Last Mission Remake</h1>
            <p>
                Originally this game was released in 1987 by Spanish company Opera Soft for multiple 8-bit computers
                including MSX1, MSX2, ZX-Spectrum, Amstrad CPC and even x86 PC. As most games of that era, The Last
                Mission was a screen-to-screen labyrinth game with shooter elements
            </p>
            <p>
                You control a flying robot with laser which have to guide the caterpillar platform through the levels of
                the undeground labyrinth up to the planet's surface. The robot can fly only a limited amount of time and
                have to land on the platform to restore the energy. The platform in turn cannot fly and shoot and can
                move on the floor only, so the robot should shoot out enemies and clear the passage ahead in order to
                move it further.
            </p>
            <p>
                This remake is based on the x86 PC DOS version with 4-color CGA graphics and beeper sound. All graphics was
                colorized to 256-color palette by hand using MSX2 version reference. Later Alexey Pavlov ported this
                game to iOS devices and did some gameplay and graphical enhancements as well. He also added sound
                effects and free music by Mark Braga.<br />
                Most probably, iOS version is nowhere to be found now, sorry for that.
            </p>
            <p>
                <b>Authors</b><br />
                Pedro Ruiz - the original author and Opera Soft founder<br />
                Dmitry Smagin - main coding<br />
                Alexey Pavlov - additional coding and gfx, porting to iOS devices<br />
                Mark Braga - music and sfx<br />
            </p>
            <p>
                <b>Downloads</b><br />
                <a href="https://github.com/dmitrysmagin/last-mission/releases/download/v0.8/last-mission-win-0.8.zip"
                    >last-mission-win-0.8.zip</a>
                - Pre-compiled binary for win95 or later<br />
                <a
                    href="https://github.com/dmitrysmagin/last-mission/releases/download/v0.8/last-mission-linux-0.8.tar.gz"
                    >last-mission-linux-0.8.tar.gz</a>
                - Pre-compiled binary for linux (Ubuntu 32-bit)<br />
                <a href="https://github.com/dmitrysmagin/last-mission/releases/download/v0.8/last-mission.opk"
                    >last-mission.opk</a>
                - Binary package for Opendingux devices (GCW-Zero, RG-350 etc)<br />
                <a href="https://github.com/dmitrysmagin/last-mission/archive/v0.8.tar.gz"
                    >last-mission-0.8-src.tar.gz</a>
                - Source code package<br />
                <a href="https://github.com/dmitrysmagin/last-mission" target="_blank">Github page</a>
                - The 'master' branch contains version 0.8 and 'unstable' has an unfinished level editor with lots of code
                improvements, though totally identical gameplay-wise.<br />
            </p>
            <p>
                <b>Other media</b><br />
                <a href="/posts/2014-08-17-making-of-the-last-mission">Making of 'The Last Mission' remake</a>
                article on <a href="https://web.archive.org/web/20220525193228/http://gcw-zero.com/" target="_blank">www.gcw-zero.com</a>
                (now defunct)<br />
                <a href="https://www.mobygames.com/game/last-mission/" target="_blank">Mobygames page</a>
            </p>
        </div>
    </div>
    <!--
    <div class="panel">
        <div class="left_panel">
            <img src="/img/wetspot2-06.png" alt="screenshot" width="320" />
            <img src="/img/wetspot2-01.png" alt="screenshot" width="320" />
            <img src="/img/wetspot2-02.png" alt="screenshot" width="320" />
        </div>
        <div class="right_panel description">
            <h1>Wetspot II</h1>
            <p>
                Originally Wetspot II was written by Angelo Mottola (Enhanced Creations) in 1997-98. Despite being
                programmed in QuickBasic 4.5 it used some low-level techniques like machine code injecting, EMS memory
                and accessing the audio hardware directly to achieve an unprecendent quality for a hobbyist game. The
                level editor was released as well, so lots of 3-rd party add-ons appeared later.
            </p>
            <p>
                The game itself resembles Pengo or Kwiksnax but with a crab as the main character. You have to kill
                enemies by pushing blocks at them at a limited amount of time. First levels are more action oriented,
                but as you proceed they become more puzzle-like.
            </p>
            <p>
                Currently you can play the original game using Dosbox if you are lucky enough to find the latest version
                and set everything up correctly. Luckily, the original site was archived and is available
                <a href="https://geocities.restorativland.org/SiliconValley/Lakes/7303/" target="_blank">here</a>.
            </p>
            <p>
                This is a full re-implementation of game engine entirely in C using SDL library written in 2013-2014.
                Multiple target platforms are supported: windows, linux and all others that have SDL. All graphics,
                sound effects and even adlib midi music were preserved to keep the old DOS feel.
            </p>
            <p>
                Initially this remake was planned as an exclusive for GCW-Zero handheld and was <a
                    href="http://www.gcw-zero.com/news.php?id=8"
                    target="_blank">released</a> for it with different music due to copyright concerns:
            </p>
            <p>
                Some differences with the original game:<br />
                - Included all 3rd party level packs available: chris2, funk, nekro, return, ricland, seav, squinky, surprise,
                wafn.<br />
                - Palette fade in/out effects are dropped<br />
                - Menu item 'OPTIONS' is dropped, because there's nothing to tune<br />
                - Cursor movement in the menu is not animated<br />
                - While in game the level timer is now shown in the status bar<br />
                - The score font is different when you pick up bonuses<br />
            </p>
            <p>
                <b>Downloads</b><br />
                <a href="https://github.com/dmitrysmagin/wetspot2/releases/download/v0.9/wetspot2-sdl2-win32.zip"
                    >wetspot2-sdl2-win32.zip</a>
                - Pre-compiled binary for windows<br />
                <a href="https://github.com/dmitrysmagin/wetspot2/archive/v0.9.zip" rel="nofollow">wetspot2-0.9.zip</a>
                - Source code package<br />
            </p>
            <p>
                <b>Other media:</b><br />
                <a href="https://github.com/dmitrysmagin/wetspot2">Wetspot II git page</a>
            </p>
        </div>
    </div>
    -->
</section>
