<!-- VerticalRentCard.svelte -->
<script lang="ts">
    import algosdk from 'algosdk'
    import Button from '../shared/Button.svelte'
    import { microAlgos, transactionSignerAccount } from '@algorandfoundation/algokit-utils'
    import { env } from '$env/dynamic/public'
    import { walletAddress } from '$lib/stores/walletStore'
    import { AlgolenClient } from '$lib/utils/AlgolenClient'

    export let data = {
        asset_id: 'Loading...',
        name: 'Loading...',
        url: '',
        price_per_day: 0,
    }

    const algod = new algosdk.Algodv2(
        env.PUBLIC_ALGOSDK_TOKEN || '',
        env.PUBLIC_ALGOSDK_SERVER,
        parseInt(env.PUBLIC_ALGOSDK_PORT)
    )
    const indexerClient = new algosdk.Indexer(
        env.PUBLIC_ALGOSDK_TOKEN || '',
        env.PUBLIC_ALGOINDEXER_SERVER,
        parseInt(env.PUBLIC_ALGOSDK_PORT)
    )
    let signer = transactionSignerAccount(
            walletAddress.signer,
            walletAddress.getValue()
        )
    let client = new AlgolenClient(
        parseInt(env.PUBLIC_APP_ID),
        env.PUBLIC_APP_ADDRESS,
        signer,
        algod,
        indexerClient
    )

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

    const handleClick = async () => {
        await client.delistNFT(parseInt(data.asset_id));
    }
</script>

<div
    class="flex w-72 p-4 justify-center items-center bg-gray-900 text-white border-2 drop-shadow-neonPrim focus:drop-shadow-neon outline-none focus:border-sec border-prim font-primary rounded-2xl"
>
    <div class="flex-shrink-0">
        <figure class="">
            <img
                src={data.url}
                alt={"Not found"}
                class="h-auto w-16 object-cover rounded-xl"
            />
        </figure>
    </div>

    <div class="flex-grow leading-5 text-sm ml-4">
        <div class="font-bold text-md">{data.name}</div>
        <div class="text-sm text-gray-400">
            {#if data.price_per_day}
                {microAlgos(data.price_per_day).algos} ALGO per day
            {:else}{/if}
        </div>
    </div>
    <div class="mt-auto">
        {#if data.price_per_day !== undefined}
        <Button onClick={handleClick} text="Reclaim" />
        {:else}
        <span class="drop-shadow-neonPrim border-prim">The NFT has been rented</span>
        {/if}
    </div>
</div>
