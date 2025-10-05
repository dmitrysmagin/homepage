<script lang="ts">
    import {
        Navbar,
        NavBrand,
        NavLi,
        NavUl,
        NavHamburger,
    } from "flowbite-svelte";

    let activeUrl = $state("/");

    $effect(() => {
        activeUrl = document?.location?.pathname;
    });
</script>

<Navbar class="border-b border-gray-200" navContainerClass="justify-end md:justify-center">
    <!--<NavBrand href="/"></NavBrand>-->
    <NavHamburger />
    <NavUl {activeUrl}>
        <NavLi href="/">Home</NavLi>
        <NavLi href="/games/">Games</NavLi>
        <NavLi href="/posts/">Articles</NavLi>
        <NavLi href="/webdemos/">Webdemos</NavLi>
    </NavUl>
</Navbar>
