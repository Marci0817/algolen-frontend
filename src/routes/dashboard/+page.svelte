<script lang="ts">
    import {
        getAlgolenRentBoxes,
        getAlgolenListingBoxes,
    } from '$lib/utils/boxUtil'
    import { walletAddress } from '$lib/stores/walletStore'
    import algosdk, { Transaction } from 'algosdk'
    import { onMount } from 'svelte'
    import type LookupAccountAssets from 'algosdk/dist/types/client/v2/indexer/lookupAccountAssets'
    import { env } from '$env/dynamic/public'
    import Navbar from '$lib/components/Navbar.svelte'
    import DashboardCard from '$lib/components/cards/RentCard.svelte'
    import ListingCard from '$lib/components/cards/ListingCard.svelte'
    import AssetCard from '$lib/components/cards/AssetCard.svelte'
    import type { NFT } from '$lib/utils/types'
    import { alerts } from '$lib/stores/alertStore'
    import PlaceholderNFT from '$lib/assets/placeholderNFT.png'
    import { loader } from "$lib/stores/loaderStore";
    import { convertToIpfsIo } from '$lib/utils/boxUtil'


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

    async function mintSampleNFT(walletAddress) {
        const params = await algod.getTransactionParams().do()
        const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
            from: $walletAddress,
            suggestedParams: params,
            total: 1,
            decimals: 0,
            defaultFrozen: false,
            unitName: 'TSTNFT',
            assetName:
                'Algolen Test NFT #' +
                Math.floor(Math.random() * 1_000_000 + 1),
            manager: $walletAddress,
            reserve: $walletAddress,
            freeze: $walletAddress,
            clawback: $walletAddress,
            assetURL: 'https://algolen.vercel.app/testnft.png',
        })
        const stxn = await walletAddress.signer([txn])
        let txid = await algod.sendRawTransaction(stxn[0]).do()
        txid = txid['txId']

        const ptx = await algod.pendingTransactionInformation(txid).do()

        const assetId = ptx['asset-index']
        alerts.add({
            type: 'success',
            title: 'Asset',
            desc: 'Test asset created',
        })
        window.location.reload();
    }

    // Declare regular variables for listings and rents
    let listingsForAddress = []
    let rentsForAddress = []
    let lentForAddress = []
    let assets: NFT[] = []

    onMount(async () => {
        if ($walletAddress) {
            loader.show(true);
            const accountAppLocalStates = await indexerClient
                .lookupAccountAssets($walletAddress)
                .do()
            accountAppLocalStates.assets.forEach(
                async (item: LookupAccountAssets) => {
                    const assetInfo: Record<string, any> = await indexerClient
                        //@ts-ignore
                        .lookupAssetByID(item['asset-id']) // It should work with item.assetId but it cause error.
                        .do()
                    const assetBalances = await indexerClient
                        .lookupAssetBalances(item['asset-id'])
                        .do()
                    const assetBalanceForAddr = assetBalances.balances
                        .filter(
                            (val) => val.address === $walletAddress
                        )
                        .reduce((total, val) => total + val.amount, 0)

                    if (
                        assetInfo.asset.params.total == 1 &&
                        assetInfo.asset.params.decimals == 0 &&
                        assetBalanceForAddr != 0
                    ) {
                        let url = convertToIpfsIo(assetInfo.asset.params.url);
                        assets.push({
                            asset_id: item['asset-id'],
                            address: assetInfo.asset.params.creator,
                            name: assetInfo.asset.params.name,
                            url: assetInfo.asset.params.url
                        })
                    }
                }
            )
            let listings = (
                await getAlgolenListingBoxes(algod, indexerClient)
            ).filter((val) => {
                return val.owner == $walletAddress
            })
            let rents = (
                await getAlgolenRentBoxes(algod, indexerClient)
            ).filter((val) => {
                return val.asset_renter == $walletAddress
            })
            let lents = (
                await getAlgolenRentBoxes(algod, indexerClient)
            ).filter((val) => {
                return val.asset_owner == $walletAddress
            })
            // Set the values in the variables
            listingsForAddress = listings
            rentsForAddress = rents
            lentForAddress = lents
            let rentsIds = rentsForAddress.map((val) => val.asset_id);
            let listingIds = listings.map((val) => val.asset_id)
            assets = assets.filter((v) => {
                return !listingIds.includes(v.asset_id)
            });
            
            listingsForAddress = listingsForAddress.filter((v) => {
                return !rentsIds.includes(v.asset_id)
            })
            loader.show(false);
        }
    })
</script>

<Navbar />
<div class="mx-12 mt-6 text-white flex gap-8 flex-wrap justify-center flex-row">
    <div class="text-center">
        <div class="text-3xl mb-4">Rented</div>

        <div
            class="p-6 border-sec rounded-2xl text-left flex flex-col gap-6 border-2"
        >
            {#if rentsForAddress.length === 0}
                <div class="text-center w-72 p-4 text-xl">
                    You have no<br />rented NFTs
                </div>
            {:else}
                {#each rentsForAddress as listing}
                    <DashboardCard data={listing} />{/each}
            {/if}
        </div>
    </div>
    <div class="text-center">
        <div class="text-3xl mb-4">Listings</div>
        <div
            class="p-6 border-sec rounded-2xl text-left flex flex-col gap-6 border-2"
        >
            {#if listingsForAddress.length === 0 && lentForAddress.length === 0}
                <div class="text-center w-72 p-4 text-xl">
                    You don't have<br /> any listings
                </div>
            {:else}
                {#each lentForAddress as listing}
                    <ListingCard data={listing} />{/each}
                {#each listingsForAddress as listing}
                    <ListingCard data={listing} />{/each}
            {/if}
        </div>
    </div>
    <div class="text-center">
        <div class="text-3xl mb-4">Your NFTs</div>
        <div
            class="p-6 border-sec rounded-2xl text-left flex flex-col gap-6 border-2"
        >
            {#if $walletAddress != undefined}
                <button
                    on:click={() => mintSampleNFT(walletAddress)}
                    class="py-3 px-8 rounded-lg drop-shadow-neon text-white font-bold bg-sec"
                    >Mint Sample NFT</button
                >
            {/if}
            {#if assets.length === 0}
                <div class="text-center w-72 p-4 text-xl">
                    You don't have<br /> any NFTs to list
                </div>
            {:else}
                {#each assets as asset}
                    <AssetCard data={asset} />{/each}
            {/if}
        </div>
    </div>
</div>
