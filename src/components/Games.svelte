<script lang="ts">
    // https://codepen.io/knownji/pen/QwLGRBg?editors=1000

    import CarouselStatic from "./CarouselStatic.svelte";
    import { P, A } from "flowbite-svelte";

    const mission_images = [
        "/img/lastmission00.png",
        "/img/lastmission01.png",
        "/img/lastmission02.png",
        "/img/lastmission03.png",
        "/img/lastmission04.png",
        "/img/lastmission05.png"
    ];

    const wetspot_images = [
        "/img/wetspot2-06.png",
        "/img/wetspot2-01.png",
        "/img/wetspot2-02.png"
    ];
</script>

<style>
</style>

<section class="max-w-3xl mx-auto">
    <div class="w-full">
        <CarouselStatic images={mission_images} />

        <div class="description">
            <h2>The Last Mission Remake</h2>
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
            <P>
                <b>Authors</b><br />
                Pedro Ruiz - the original author and Opera Soft founder<br />
                Dmitry Smagin - main coding<br />
                Alexey Pavlov - additional coding and gfx, porting to iOS devices<br />
                Mark Braga - music and sfx<br />
            </P>
            <p>
                <b>Downloads</b><br />
                <A href="https://github.com/dmitrysmagin/last-mission/releases/download/v0.8/last-mission-win-0.8.zip"
                    >last-mission-win-0.8.zip</A>
                - Pre-compiled binary for win95 or later<br />
                <A
                    href="https://github.com/dmitrysmagin/last-mission/releases/download/v0.8/last-mission-linux-0.8.tar.gz"
                    >last-mission-linux-0.8.tar.gz</A>
                - Pre-compiled binary for linux (Ubuntu 32-bit)<br />
                <A href="https://github.com/dmitrysmagin/last-mission/releases/download/v0.8/last-mission.opk"
                    >last-mission.opk</A>
                - Binary package for Opendingux devices (GCW-Zero, RG-350 etc)<br />
                <A href="https://github.com/dmitrysmagin/last-mission/archive/v0.8.tar.gz"
                    >last-mission-0.8-src.tar.gz</A>
                - Source code package<br />
                <A href="https://github.com/dmitrysmagin/last-mission" target="_blank">Github page</A>
                - The 'master' branch contains version 0.8 and 'unstable' has an unfinished level editor with lots of code
                improvements, though totally identical gameplay-wise.<br />
            </p>
            <p>
                <b>Other media</b><br />
                <A href="/posts/2014-08-17-making-of-the-last-mission">Making of 'The Last Mission' remake</A>
                article on <A href="https://web.archive.org/web/20220525193228/http://gcw-zero.com/" target="_blank">www.gcw-zero.com</A>
                (now defunct)<br />
                <A href="https://www.mobygames.com/game/last-mission/" target="_blank">Mobygames page</A>
            </p>
        </div>
    </div>
    <div class="panel">
        <CarouselStatic images={wetspot_images} />
        <div class="description">
            <h2>Wetspot II</h2>
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
                <A href="https://geocities.restorativland.org/SiliconValley/Lakes/7303/" target="_blank">here</A>.
            </p>
            <p>
                This is a full re-implementation of game engine entirely in C using SDL library written in 2013-2014.
                Multiple target platforms are supported: windows, linux and all others that have SDL. All graphics,
                sound effects and even adlib midi music were preserved to keep the old DOS feel.
            </p>
            <p>
                Initially this remake was planned as an exclusive for GCW-Zero handheld and was
                <A href="http://www.gcw-zero.com/news.php?id=8" target="_blank">released</A>
                for it with different music due to copyright concerns:
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
                <A href="https://github.com/dmitrysmagin/wetspot2/releases/download/v0.9/wetspot2-sdl2-win32.zip"
                    >wetspot2-sdl2-win32.zip</A>
                - Pre-compiled binary for windows<br />
                <A href="https://github.com/dmitrysmagin/wetspot2/archive/v0.9.zip" rel="nofollow">wetspot2-0.9.zip</A>
                - Source code package<br />
            </p>
            <p>
                <b>Other media:</b><br />
                <A href="https://github.com/dmitrysmagin/wetspot2">Wetspot II git page</A>
            </p>
        </div>
    </div>

</section>
