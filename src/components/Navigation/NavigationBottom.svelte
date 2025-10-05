<script lang="ts">
    import {
        Footer,
        FooterLinkGroup,
        FooterLink,
        FooterIcon,
        ImagePlaceholder,
        TextPlaceholder,
        Skeleton,
        FooterCopyright,
        A
    } from "flowbite-svelte";
    import { FacebookSolid, GithubSolid, DiscordSolid, TwitterSolid } from "flowbite-svelte-icons";
</script>

<!--
<footer class="py-5 mt-4 text-center text-[#f4f7fb] bg-[#06395a]">
    Built with fabulous <a class="text-inherit" href="https://astro.build/"
        >Astro</a
    > framework
</footer>
-->

<Footer class="rounded-[0] sticky start-0 bottom-0 z-20 w-full border-t border-gray-200 bg-white p-4 shadow-sm md:flex md:items-center md:justify-between md:p-6 dark:border-gray-600 dark:bg-gray-800">
    <!--<FooterCopyright href="/" by="Flowbite™" year={2025}/>-->
    <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
        Created with <A class="text-inherit" href="https://astro.build/">Astro</A>, Tailwind/Flowbite.
    </span>
    <FooterLinkGroup class="mt-3 flex flex-wrap items-center text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
        <FooterLink href="/">About</FooterLink>
        <FooterIcon href="https://github.com/dmitrysmagin/">
            <GithubSolid class="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white" />
        </FooterIcon>
    </FooterLinkGroup>
</Footer>
