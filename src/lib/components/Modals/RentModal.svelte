<script lang="ts">
    import type { AlgolenListing } from "$lib/utils/types";
    import { modals } from "./modal";
    import Button from "$lib/components/shared/Button.svelte";

    export let modalID;
    export let listing: AlgolenListing;

    let day = 0;
    const MAX_DAY = 180;
</script>

<div
    class="bg-gray-900 text-white border-2 drop-shadow-neonPrim border-prim font-primary rounded-2xl py-7 px-8 md:px-16"
>
    <button
        on:click={() => modals.close(modalID)}
        class="absolute right-7 top-4 font-bold text-gray-200 text-lg"
    >
        x
    </button>
    <div class="flex flex-col">
        <div class="flex md:flex-row flex-col items-center md:items-start">
            <img
                src={"https://ipfs.io/ipfs/bafybeid2ej622yaudvk65vlio6sk56mitrd4qmcbzkh3yl6kf7mw6rzl4u#i"}
                alt={""}
                class="w-48 rounded-lg"
            />
            <div class="mx-0 md:mx-6 w-full md:w-auto mt-4 md:mt-0">
                <div class="text-xl">name</div>
                <div class="">this_is_the_address</div>
                <div class="">price/day</div>
                <div class="">deposit</div>
            </div>
        </div>
        <div class="mt-8">
            <div class="">
                <p class="mb-2 text-lg">Max length</p>
                <div class="flex justify-between">
                    <p>
                        <span class="font-semibold">{day}</span>
                        <span class="text-gray-300">day</span>
                    </p>
                    <p>
                        <span class="font-semibold">{MAX_DAY}</span>
                        <span class="text-gray-300">day</span>
                    </p>
                </div>
                <input
                    class="w-full"
                    type="range"
                    min={0}
                    max={MAX_DAY}
                    bind:value={day}
                />
            </div>
            <div class="max-w-md text-sm text-gray-300 my-5">
                disclaimer disclaimer disclaimer disclaimer disclaimer
                disclaimer disclaimer disclaimer disclaimer disclaimer
                disclaimer disclaimer disclaimer disclaimer disclaimer
                disclaimer disclaimer disclaimer
            </div>
            <div class="flex justify-between">
                <div class="flex justify-center items-center gap-2">
                    <input type="checkbox" />
                    <p class="text-red-500 text-sm mx-4 md:mx-0">
                        I accept the terms and conditions
                    </p>
                </div>
                <div class="">
                    <button
                        on:click={() => ""}
                        class=" rounded-lg font-bold px-8 py-2 border-2 border-sec drop-shadow-neon"
                        ><p class="text-lg text-sec">Rent</p></button
                    >
                </div>
            </div>
        </div>
    </div>
</div>
