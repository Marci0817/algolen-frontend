<script lang="ts">
    import type { AlgolenListing } from "$lib/utils/types";
    import { modals } from "./modal";
    import Button from "$lib/components/shared/Button.svelte";

    export let modalID;
    export let listing: AlgolenListing;

    let day = 1;
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
            <img src={listing.url} alt={listing.name} class="w-48 rounded-lg" />
            <div class="mx-0 md:mx-6 w-full md:w-auto mt-4 md:mt-0 max-w-md">
                <p class="text-2xl font-bold">{listing.name}</p>
                <div class=" max-w-xs">
                    <p class="text-sm text-gray-400 break-words">
                        {listing.owner}
                    </p>
                </div>
                <div class="mt-2 gap-2 flex justify-between">
                    <div>
                        <p class="text-gray-300 font-semibold">Price per day</p>
                        <p>{listing.price_per_day} ALGO</p>
                    </div>
                    <div>
                        <p class="text-gray-300 font-semibold">Deposit</p>
                        <p>{listing.deposit} ALGO</p>
                    </div>
                </div>
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
                        <span class="font-semibold"
                            >{listing.max_duration_in_days}</span
                        >
                        <span class="text-gray-300">day</span>
                    </p>
                </div>
                <input
                    class="w-full"
                    type="range"
                    min={1}
                    max={listing.max_duration_in_days}
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
                        class=" rounded-lg font-bold px-8 py-2"
                        ><p class="text-lg text-sec">Rent</p></button
                    >
                </div>
            </div>
        </div>
    </div>
</div>
