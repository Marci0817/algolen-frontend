<script lang="ts">
    import { env } from '$env/dynamic/public'
    import { walletAddress } from '$lib/stores/walletStore'
    import { AlgolenClient } from '$lib/utils/AlgolenClient'
    import type { NFT } from '$lib/utils/types'
    import { transactionSignerAccount } from '@algorandfoundation/algokit-utils'
    import { modals } from './modal'
    import algosdk from 'algosdk'
    import Button from '../shared/Button.svelte'
    import { alerts } from '$lib/stores/alertStore'

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

    export let modalID
    export let nft: NFT
    let isAccepted = false
    let currDays = 1
    let price_per_day = 1
    let deposit = 1
    let isListLoading = false;

    async function lendFlow() {
        isListLoading = true;
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
        let optedIn = await client.check_opted_into_asset(nft.asset_id)
        if (!optedIn) {
            await client.opt_in_to_asset(nft.asset_id)
        }
        alerts.add({
            type: 'info',
            title: 'Transaction sent for signing',
            desc: 'Please check your wallet',
        })
        await client.listNft(
            nft.asset_id,
            deposit * 1_000_000,
            price_per_day * 1_000_000,
            currDays
        )
        modals.close(modalID)
        alerts.add({
            type: 'info',
            title: 'Your transaction is being processed',
            desc: '',
        })
        isListLoading = false;
        window.location.reload();
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
    <div class="flex flex-row gap-8">
        <div>
            <img src={nft.url} alt={"Not found"} class="h-48 w-48 rounded-lg" />
        </div>
        <div class="">
            <div class="text-2xl font-bold">{nft.name}</div>
            <div class=" max-w-xs">
                <div class="text-sm text-gray-400 break-words">
                    <a
                        target="_blank"
                        href={`https://testnet.algoexplorer.io/address/${nft.address}`}
                        >{nft.address}</a
                    >
                </div>
            </div>
            <div class="text-gray-300 mt-2 font-semibold">Price/Day</div>
            <div class="w-72">
                <div class="relative h-10 w-full min-w-[200px]">
                    <div
                        class="absolute top-2/4 -translate-x-4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500"
                    >
                        <p>ALGO</p>
                    </div>
                    <input
                        class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        bind:value={price_per_day}
                        type="number"
                    />
                </div>
            </div>
            <div class="text-gray-300 mt-2 font-semibold">Deposit</div>
            <div class="">
                <div class="w-72">
                    <div class="relative h-10 w-full min-w-[200px]">
                        <div
                            class="absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 -translate-x-4 place-items-center text-blue-gray-500"
                        >
                            <p>ALGO</p>
                        </div>
                        <input
                            class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            bind:value={deposit}
                            type="number"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="flex flex-row justify-between">
        <div class="text-lg flex-grow mt-8 mb-2">1</div>
        <div class="text-lg flex-grow mt-8 mb-2">
            Max rent period: {currDays}
        </div>
        <div class="text-lg mt-8 mb-2">180</div>
    </div>
    <input
        bind:value={currDays}
        class="w-full bg-gray-900"
        type="range"
        min={1}
        max={180}
    />

    <div class="flex flex-col">
        <div class="max-w-md text-sm text-gray-300 my-5">
            By checking this box, you agree to our <a
                class="text-red-500 font-bold"
                href="/termsconditions"
                on:click={() => modals.close(modalID)}>terms and conditions</a
            >
        </div>
        <div class="flex justify-between">
            <div class="flex justify-center items-center gap-2">
                <input bind:value={isAccepted} type="checkbox" />
                <p class="text-red-500 text-sm mx-4 md:mx-0">
                    I accept the terms and conditions
                </p>
            </div>
            {#if !isListLoading}
                <Button
                    disabled={!isAccepted}
                    text="List"
                    onClick={lendFlow}
                    className={!isAccepted
                        ? 'opacity-50 cursor-not-allowed'
                        : 'opacity-100 cursor-pointer'}
                />
            {:else}
                <p class="animate-pulse text-white">Listing..</p>
            {/if}
        </div>
    </div>
</div>
