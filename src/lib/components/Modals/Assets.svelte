<script lang="ts">
    import { walletAddress } from "$lib/stores/walletStore";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import * as algosdk from "algosdk";
    import type { TransactionWithSigner } from "algosdk";
    import { env } from "$env/dynamic/public";
    import { FracticdistributionClient } from "$lib/utils/contractclient";

    //types
    import type LookupAccountAssets from "algosdk/dist/types/client/v2/indexer/lookupAccountAssets";
    export let modalID: number;

    const indexerClient = new algosdk.Indexer(
        env.PUBLIC_ALGOSDK_TOKEN,
        env.PUBLIC_ALGOSDK_SERVER,
        env.PUBLIC_ALGOSDK_PORT
    );

    const algod = new algosdk.Algodv2(
        env.PUBLIC_ALGOSDK_TOKEN,
        env.PUBLIC_ALGOSDK_SERVER,
        env.PUBLIC_ALGOSDK_PORT
    );

    let assetsName: any[] = [];

    onMount(async () => {
        await fetchAssets();
    });

    async function fetchAssets() {
        if ($walletAddress) {
            const accountAppLocalStates = await indexerClient
                .lookupAccountAssets($walletAddress)
                .do();

            accountAppLocalStates.assets.forEach(
                async (item: LookupAccountAssets) => {
                    const assetInfo: Record<string, any> = await indexerClient
                        //@ts-ignore
                        .lookupAssetByID(item["asset-id"]) // It should work with item.assetId but it cause error.
                        .do();
                    if (
                        assetInfo.asset.params.total === 1 &&
                        assetInfo.asset.params.decimals === 0
                    ) {
                        assetsName = [...assetsName, assetInfo.asset];
                    }
                }
            );
        }
    }

    async function optInToAsset(assetId: number) {
        if (!$walletAddress) {
            console.log("No wallet address");
            return 0;
        }

        const signer = await walletAddress.signer;

        let client = new FracticdistributionClient(
            { sender: $walletAddress, params: env.PUBLIC_APP_ID },
            algosdk.Algodv2
        );

        let paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: $walletAddress,
            to: algosdk.getApplicationAddress(parseInt(env.PUBLIC_APP_ID)),
            amount: algosdk.algosToMicroalgos(100000),
            suggestedParams: await algod.getTransactionParams().do(),
        });

        const transactionWithSigner: TransactionWithSigner = {
            txn: paymentTxn,
            signer: await signer(paymentTxn),
        };
        client.optInToAsset(transactionWithSigner);
    }
</script>

<div
    class="bg-gray-900 text-white border-2 drop-shadow-neonPrim border-prim font-primary rounded-2xl py-7 px-16 w-auto"
>
    <h1 class="text-center text-lg font-semibold">Assets</h1>

    <ul>
        {#if assetsName.length > 0}
            {#each assetsName as assetName}
                <li class="flex gap-3">
                    <p class="font-bold">
                        {assetName.params.name} ( {assetName.index} )
                    </p>
                    <button
                        class="text-red-500"
                        on:click={() => optInToAsset(assetName.index)}
                        >Fractionalize
                    </button>
                </li>
            {/each}
        {:else}
            <li class="text-black">You dont have assets</li>
        {/if}
    </ul>
</div>
