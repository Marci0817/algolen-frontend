<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import * as algosdk from "algosdk";
    import { env } from "$env/dynamic/public";
    import { onMount } from "svelte";
    import { walletAddress } from "$lib/stores/walletStore";

    import type LookupAccountAssets from "algosdk/dist/types/client/v2/indexer/lookupAccountAssets";

    const codec = algosdk.ABIType.from('(uint64,uint64,uint64,address)');

    const indexerClient = new algosdk.Indexer(
        env.PUBLIC_ALGOSDK_TOKEN,
        env.PUBLIC_ALGOSDK_SERVER,
        443 
    );
    const algodClient = new algosdk.Algodv2(
        env.PUBLIC_ALGOSDK_TOKEN,
        env.PUBLIC_ALGOSDK_SERVER,
        443 
    );

    let assetsName: string[] = [];

    async function fetchAssets(walletAddress: string) {
        let assetQueryResult = await indexerClient
            .lookupAccountAssets(walletAddress) //TODO: Change this address to $walletAddress
            .do(); 
            assetQueryResult.assets.forEach(
                async (item: LookupAccountAssets) => {
                    const assetInfo: Record<string, any> = await indexerClient
                        //@ts-ignore
                        .lookupAssetByID(item["asset-id"])
                        .do();
                    //if (assetInfo.asset.params.total === 1 && assetInfo.asset.params.decimals === 0) { // TODO: Delete this comment
                    assetsName = [...assetsName, assetInfo.asset.params.name];
                    //}
                }
            );
        let res = await algodClient.getApplicationBoxes(478327734).do();
        const boxNames = res.boxes.map((box) => box.name);
        for(const boxName in boxNames) {
            const content_encoded = await algodClient
			.getApplicationBoxByName(478327734, )
			.do();

		    const content_decoded: algosdk.ABIValue = codec.decode(content_encoded.value);
            alert(content_decoded)
        }
        
    }
    onMount(async () => {
       if(walletAddress?.getValue()) {
       await fetchAssets(walletAddress);
    }
    })

</script>

<Navbar />
<ul>
    {#each assetsName as item (item)}
      <li>{item}</li>
    {/each}
  </ul>
