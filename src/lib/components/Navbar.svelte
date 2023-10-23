<script lang="ts">
    import ConnectButton from "$lib/components/ConnectButton.svelte";
    import { getAllContexts } from "svelte";
    import { fade } from "svelte/transition";

    let isShowSubMenu: boolean = false;
</script>

<div class="flex justify-between items-center mx-20 mt-8 font-quicksand">
    <div class="">
        <h1 class="font-bold text-3xl">Fractic.</h1>
        <p class="text-md text-gray-700">Best service</p>
    </div>
    <div>
        <ul class="flex flex-row font-semibold">
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
                class="mx-4 flex-flex-col"
                on:mouseover={() => {
                    isShowSubMenu = true;
                }}
                on:mouseleave={() => {
                    isShowSubMenu = false;
                }}
            >
                <li class=" cursor-pointer">Fractionalize</li>
                {#if isShowSubMenu}
                    <div
                        in:fade={{ duration: 100 }}
                        class="absolute bg-gray-100 rounded-md p-2 px-4 drop-shadow-md font-medium"
                    >
                        <ul>
                            <li>asd</li>
                            <li>asd</li>
                            <li>asd</li>
                            <li>asd</li>
                        </ul>
                    </div>
                {/if}
            </div>
            <li class="mx-4 cursor-pointer">Community</li>
            <li class="mx-4 cursor-pointer">Support</li>
            <li class="mx-4 cursor-pointer">Credits</li>
        </ul>
    </div>
    <div>
        <ConnectButton />
    </div>
</div>
