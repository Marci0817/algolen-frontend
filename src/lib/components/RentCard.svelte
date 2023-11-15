<script lang="ts">
    import type { AlgolenListing } from '$lib/utils/types'
    import { openRentModal } from './Modals/modal'
    import Button from './shared/Button.svelte'
    import { microAlgos } from '@algorandfoundation/algokit-utils'

    export let data: AlgolenListing = {
        asset_id: 0,
        name: 'Loading...',
        url: '',
        deposit: 0,
        price_per_day: 0,
        max_duration_in_days: 0,
        owner: '',
    }

    const handleRentButtonClick = () => {
        openRentModal(data)
    }
</script>

<div
    class="w-56 bg-gray-900 text-white border-2 drop-shadow-2xl outline-none border-gray-800 font-primary rounded-lg"
>
    <figure class="">
        <img
            src={data.url}
            alt={data.asset_id == 0 ? 'Loading...' : "Not found"}
            class="h-48 w-full rounded-t-lg"
        />
    </figure>

    <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{data.name}</div>

        <div class="flex flex-col mb-1">
            <div class="mt-1 mb-5 justify-between flex">
                <div class="text-center">
                    <p class="font-semibold text-gray-400">Price/Day</p>
                    <p>
                        {#if data.price_per_day}
                            {microAlgos(data.price_per_day).algos}
                        {:else}
                            0
                        {/if}
                        <span class="font-semibold">ALGO</span>
                    </p>
                </div>
                <div class="text-center">
                    <p class="font-semibold text-gray-400">Deposit</p>
                    <p>
                        {#if data.deposit}
                            {microAlgos(data.deposit).algos}
                            <span class="font-semibold">ALGO</span>
                        {:else}
                            0 <span class="font-semibold">ALGO</span>
                        {/if}
                    </p>
                </div>
            </div>
            <Button onClick={handleRentButtonClick} text="Rent" />
        </div>
    </div>
</div>
