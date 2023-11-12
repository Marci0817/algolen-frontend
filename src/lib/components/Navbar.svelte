<script lang="ts">
    import ConnectButton from "$lib/components/ConnectButton.svelte";
    import { fade } from "svelte/transition";
    import NavbarItems from "$lib/components/NavbarItems.svelte";

    let isSideBarOpen = false;
</script>

<div
    class="flex justify-between items-center mx-16 md:mx-10 mt-10 font-primary text-white"
>
    <div class="flex justify-center items-center">
        <div class="mr-8">
            <h1
                class="font-extrabold text-4xl bg-clip-text bg-gradient-to-r text-transparent from-prim to-sec"
            >
                <p class="md:hidden block">Algolen</p>
                <p class="hidden md:block">Algolen</p>
            </h1>
        </div>
        <div class="hidden md:block">
            <NavbarItems />
        </div>
        <div class="absolute right-12 md:hidden">
            <button
                on:click={() => {
                    isSideBarOpen = !isSideBarOpen;
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg></button
            >
        </div>
    </div>
    <div class="md:block hidden">
        <ConnectButton />
    </div>
</div>

<aside
    class="absolute w-full h-full left-0 top-0 bg-gray-200 border-r-2 shadow-lg"
    class:isSideBarOpen
>
    <nav class="p-12 text-xl">
        <div class="absolute right-12 md:hidden">
            <button
                on:click={() => {
                    isSideBarOpen = !isSideBarOpen;
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>
        <NavbarItems />
        <ConnectButton />
    </nav>
</aside>

<style>
    aside {
        left: -100%;
        transition: left 0.3s ease-in-out;
    }

    .isSideBarOpen {
        left: 0;
    }
</style>
