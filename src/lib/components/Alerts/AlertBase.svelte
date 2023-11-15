<script lang="ts">
    import { fade } from "svelte/transition";
    import type { Alert } from "$lib/stores/alertStore";

    export let alert: Alert;

    let isVisible = true;

    const toggleVisibility = (e: boolean) => {
        isVisible = e;
    };
</script>

{#if isVisible}
    {#if alert.type === "info"}
        <div
            class="mx-auto relative flex max-w-md w-64 z-50 p-4 mb-4 mt-4 text-sm rounded-lg border bg-gray-800 text-blue-400 border-blue-800"
            role="alert"
            in:fade
            out:fade
        >
            <svg
                aria-hidden="true"
                class="flex-shrink-0 inline w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                /></svg
            >
            <span class="sr-only">Info</span>
            <div>
                <span class="font-medium">{alert.title}</span>
                {alert.desc}
            </div>
            <!--<div class="absolute right-4">
                svelte-ignore a11y-click-events-have-key-events 
                <i
                    class="font-semibold text-red-500 cursor-pointer"
                    on:click={() => toggleVisibility(false)}>x</i
                >
            </div>-->
        </div>
    {:else if alert.type === "error"}
        <div
            class="mx-auto relative flex max-w-md w-64 z-50 p-4 mb-4 mt-4 text-sm rounded-lg border bg-gray-800 text-red-400 border-red-800"
            role="alert"
            in:fade
            out:fade
        >
            <svg
                aria-hidden="true"
                class="flex-shrink-0 inline w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                /></svg
            >
            <span class="sr-only">Info</span>
            <div>
                <span class="font-medium">{alert.title}</span>
                {alert.desc}
            </div>
            <!--<div class="absolute right-4">
                svelte-ignore a11y-click-events-have-key-events 
                <i
                    class="font-semibold text-red-500 cursor-pointer"
                    on:click={() => toggleVisibility(false)}>x</i
                >
            </div>-->
        </div>
    {:else if alert.type === "success"}
        <div
            class="mx-auto relative flex max-w-md w-64 z-50 p-4 mb-4 mt-4 text-sm rounded-lg border bg-gray-800 text-green-400 border-green-800 content-center"
            role="alert"
            in:fade
            out:fade
        >
            <svg
                aria-hidden="true"
                class="flex-shrink-0 inline w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                /></svg
            >
            <span class="sr-only">Info</span>
            <div>
                <span class="font-medium">{alert.title}</span>
                {alert.desc}
            </div>
            <!--<div class="absolute right-4">
                svelte-ignore a11y-click-events-have-key-events 
                <i
                    class="font-semibold text-red-500 cursor-pointer"
                    on:click={() => toggleVisibility(false)}>x</i
                >
            </div>-->
        </div>
    {/if}
{/if}
