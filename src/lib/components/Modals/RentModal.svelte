<script lang="ts">
    import type { AlgolenListing } from '$lib/utils/types'
    import { modals } from './modal'

    import algosdk from 'algosdk'
    import { env } from '$env/dynamic/public'
    import { walletAddress } from '$lib/stores/walletStore'
    import { check_opted_into_asset } from '$lib/utils/checkOptIn'
    import { AlgolenClient } from '$lib/utils/AlgolenClient'
    import { transactionSignerAccount } from '@algorandfoundation/algokit-utils'
    import { microAlgos } from '@algorandfoundation/algokit-utils'
    import Button from '../shared/Button.svelte'
    import { alerts } from '$lib/stores/alertStore'

    export let modalID
    export let listing: AlgolenListing
    let isAccepted = false
    let isRentLoading = false;

    let day = 1
    const algod = new algosdk.Algodv2(
        env.PUBLIC_ALGOSDK_TOKEN || '',
        env.PUBLIC_ALGOSDK_SERVER,
        env.PUBLIC_ALGOSDK_PORT
    )
    const indexer = new algosdk.Indexer(
        env.PUBLIC_ALGOSDK_TOKEN || '',
        env.PUBLIC_ALGOINDEXER_SERVER,
        env.PUBLIC_ALGOSDK_PORT
    )

    const rentFlow = async () => {
        isRentLoading = true;
        let signer = transactionSignerAccount(
            walletAddress.signer,
            walletAddress.getValue()
        )
        let client = new AlgolenClient(
            parseInt(env.PUBLIC_APP_ID),
            env.PUBLIC_APP_ADDRESS,
            signer,
            algod,
            indexer
        )
        let optedIn = await check_opted_into_asset(
            indexer,
            listing.asset_id,
            walletAddress.getValue()
        )
        if (!optedIn) {
            await client.optIntoAsset(listing.asset_id)
        }
        alerts.add({
            type: 'info',
            title: 'Transaction sent for signing',
            desc: 'Please check your wallet',
        })
        await client.rentNFT(
            listing.asset_id,
            listing.deposit,
            day,
            listing.price_per_day,
            listing.owner
        )
        modals.close(modalID)
        alerts.add({
            type: 'success',
            title: 'Transaction submitted successfully',
            desc: 'Waiting for confirmation',
        })
        isRentLoading= false;
    }
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
                src={listing.url}
                alt={"Not found"}
                class="h-48 w-48 rounded-lg"
            />
            <div class="mx-0 md:mx-6 w-full md:w-auto mt-4 md:mt-0 max-w-md">
                <p class="text-2xl font-bold">{listing.name}</p>
                <div class=" max-w-xs">
                    <p class="text-sm text-gray-400 break-words">
                        <a
                            target="_blank"
                            href={`https://testnet.algoexplorer.io/address/${listing.owner}`}
                            >{listing.owner}</a
                        >
                    </p>
                </div>
                <div class="mt-2 gap-2 flex justify-between">
                    <div>
                        <p class="text-gray-300 font-semibold">Price/Day</p>
                        <p>{microAlgos(listing.price_per_day).algos} ALGO</p>
                    </div>
                    <div>
                        <p class="text-gray-300 font-semibold">Deposit</p>
                        <p>{microAlgos(listing.deposit).algos} ALGO</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-8">
            <div class="">
                <div class="flex justify-between">
                    <p>
                        <span class="text-gray-300">1</span>
                        <span class="text-gray-300">day</span>
                    </p>
                    <p>
                        <span class="text-gray-300">Rent period: {day}</span>
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
                    max={listing.max_duration_in_days.toString()}
                    bind:value={day}
                />
                <div class="mt-2">
                    Total rent cost: {(
                        (listing.price_per_day * day) / 1000000 +
                        listing.deposit / 1000000
                    ).toFixed(2)} ALGO + 0.004 ALGO fee
                </div>
            </div>
            <div class="max-w-md text-sm text-gray-300 my-5">
                By checking this box, you agree to our <a
                    class="text-red-500 font-bold"
                    href="/termsconditions"
                    on:click={() => modals.close(modalID)}
                    >terms and conditions</a
                >
            </div>
            <div class="flex justify-between">
                <div class="flex justify-center items-center gap-2">
                    <input type="checkbox" bind:value={isAccepted} />
                    <p class="text-red-500 text-sm mx-4 md:mx-0">
                        I accept the terms and conditions
                    </p>
                </div>
                <div class="">
                    {#if !isRentLoading}
                    <Button
                        disabled={!isAccepted}
                        onClick={rentFlow}
                        text="Rent"
                        className={!isAccepted
                            ? 'opacity-50 cursor-not-allowed'
                            : 'opacity-100 cursor-pointer'}
                    />
                    {:else}
                        <p class="animate-pulse text-white">Signing..</p>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>
