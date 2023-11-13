<script lang="ts">
    import { getAlgolenRentBoxes, getAlgolenListingBoxes} from "$lib/utils/boxUtil";
    import { walletAddress } from "$lib/stores/walletStore";
    import algosdk from "algosdk";
    import { onMount } from "svelte";
    import type LookupAccountAssets from "algosdk/dist/types/client/v2/indexer/lookupAccountAssets";
    import { env } from "$env/dynamic/public";
    import Navbar from "$lib/components/Navbar.svelte";

    const algod = new algosdk.Algodv2(
        env.PUBLIC_ALGOSDK_TOKEN || "",
        env.PUBLIC_ALGOSDK_SERVER,
        parseInt(env.PUBLIC_ALGOSDK_PORT)
    );
    const indexerClient = new algosdk.Indexer(
        env.PUBLIC_ALGOSDK_TOKEN || "",
        env.PUBLIC_ALGOINDEXER_SERVER,
        parseInt(env.PUBLIC_ALGOSDK_PORT)
    );

    // Declare regular variables for listings and rents
    let listingsForAddress = [];
    let rentsForAddress = [];
    let assetsName: object[] = [];

    onMount(async () => {

        if (walletAddress.getValue()) {
            
            const accountAppLocalStates = await indexerClient
            .lookupAccountAssets(walletAddress.getValue())
            .do();

            accountAppLocalStates.assets.forEach(
                async (item: LookupAccountAssets) => {
                const assetInfo: Record<string, any> = await indexerClient
                    //@ts-ignore
                    .lookupAssetByID(item["asset-id"])
                    .do();
                    if (assetInfo.asset.params.total == 1 && assetInfo.asset.params.decimals == 0) { 
                        assetsName.push({'assetName': assetInfo.asset.params.name, 'assetUrl': assetInfo.asset.params.url})
                    }
                }
            );

            let listings = (await getAlgolenListingBoxes(algod, indexerClient)).filter((val) => {
                return val.owner == walletAddress.getValue();
            });
            let rents = (await getAlgolenRentBoxes(algod)).filter((val) => {
                return val.asset_renter == walletAddress.getValue();
            });
            // Set the values in the variables
            listingsForAddress = listings;
            rentsForAddress = rents;
        }
    });

</script>
<Navbar />