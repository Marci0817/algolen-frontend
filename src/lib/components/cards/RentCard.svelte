<!-- VerticalRentCard.svelte -->
<script lang="ts">
    import Button from '../shared/Button.svelte'
    import { microAlgos } from '@algorandfoundation/algokit-utils'
    enum Status {
        RENTED = 'Rented',
        EXPIRED = 'Expired',
    }

    export let data = {
        asset_id: 'Loading...',
        name: 'Loading...',
        url: '',
        price_per_day: 0,
        end_date: 0,
    }

    const getTime = (time: number) => {
        let date = new Date(time * 1000)
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
        }).format(date)
    }

    const handleClick = () => {
        console.log('Button clicked')
        // You can perform further actions here
    }
</script>

<div
    class="flex w-72 p-4 justify-center items-center bg-gray-900 text-white border-2 drop-shadow-neonPrim focus:drop-shadow-neon outline-none focus:border-sec border-prim font-primary rounded-2xl"
>
    <div class="flex-shrink-0">
        <figure class="">
            <img
                src={data.url}
                alt={data.name}
                class="h-auto w-16 object-cover rounded-xl"
            />
        </figure>
    </div>

    <div class="flex-grow leading-5 text-sm ml-4">
        <div class="font-bold text-md">{data.name}</div>
        {#if data.price_per_day}
            <div class="text-sm text-gray-400">
                {microAlgos(data.price_per_day).algos} ALGO per day
            </div>
        {/if}
        {#if data.end_date}
            <div>
                {getTime(data.end_date)}
            </div>
            {#if data.end_date * 1000 < Date.now()}
                <div class="text-sm text-red-500">{Status.EXPIRED}</div>
            {:else}
                <div class="text-sm text-green-500">{Status.RENTED}</div>
            {/if}
        {/if}
    </div>
    <div class="mt-auto">
        <Button onClick={handleClick} text="Return" />
    </div>
</div>
