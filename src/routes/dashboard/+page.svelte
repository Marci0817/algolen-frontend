<script lang="ts">

  import {
    getAlgolenRentBoxes,
    getAlgolenListingBoxes,
  } from "$lib/utils/boxUtil";
  import { walletAddress } from "$lib/stores/walletStore";
  import algosdk from "algosdk";
  import { onMount } from "svelte";
  import type LookupAccountAssets from "algosdk/dist/types/client/v2/indexer/lookupAccountAssets";
  import { env } from "$env/dynamic/public";
  import Navbar from "$lib/components/Navbar.svelte";
  import DashboardCard from "$lib/components/cards/RentCard.svelte";
  import ListingCard from "$lib/components/cards/ListingCard.svelte";
  import AssetCard from "$lib/components/cards/AssetCard.svelte";
  import { algolenRents } from "./mock";
  import { list } from "postcss";

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

  interface Asset {
    name: string;
    url: string;
  }

  // Declare regular variables for listings and rents
  let listingsForAddress = [];
  let rentsForAddress = [];
  let lentForAddress = [];
  let assetsName: Asset[] = [];

  onMount(async () => {
    if (walletAddress.getValue()) {
      const accountAppLocalStates = await indexerClient
        .lookupAccountAssets(walletAddress.getValue())
        .do();
      accountAppLocalStates.assets.forEach(
        async (item: LookupAccountAssets) => {
          const assetInfo: Record<string, any> = await indexerClient
            //@ts-ignore
            .lookupAssetByID(item["asset-id"]) // It should work with item.assetId but it cause error.
            .do();

          if (
            assetInfo.asset.params.total == 1 &&
            assetInfo.asset.params.decimals == 0
          ) {
            assetsName.push({
              name: assetInfo.asset.params.name,
              url: assetInfo.asset.params.url,
            });
          }
        }
      );
      let listings = (
        await getAlgolenListingBoxes(algod, indexerClient)
      ).filter((val) => {
        return val.owner == walletAddress.getValue();
      });
      let rents = (await getAlgolenRentBoxes(algod, indexerClient)).filter(
        (val) => {
          return val.asset_renter == walletAddress.getValue();
        }
      );
      let lents = (await getAlgolenRentBoxes(algod, indexerClient)).filter(
        (val) => {
          return val.asset_owner == walletAddress.getValue();
        }
      );
      // Set the values in the variables
      listingsForAddress = listings;
      rentsForAddress = rents;
      lentForAddress = lents;
    }
  });
</script>

<Navbar />
<div class="mx-12 mt-6 text-white flex gap-8 flex-wrap justify-center flex-row">
  <div class="text-center">
    <div class="text-3xl mb-4">Rented</div>

    <div
      class="p-6 border-sec rounded-2xl text-left flex flex-col gap-6 border-2"
    >
      {#each rentsForAddress as listing}
        <DashboardCard data={listing} />{/each}
    </div>
  </div>
  <div class="text-center">
    <div class="text-3xl mb-4">Listings</div>
    <div
      class="p-6 border-sec rounded-2xl text-left flex flex-col gap-6 border-2"
    >
      {#each lentForAddress as listing}
        <ListingCard data={listing} />{/each}
      {#each listingsForAddress as listing}
        <ListingCard data={listing} />{/each}
    </div>
  </div>
  <div class="text-center">
    <div class="text-3xl mb-4">Your NFTs</div>
    <div
      class="p-6 border-sec rounded-2xl text-left flex flex-col gap-6 border-2"
    >
      {#each assetsName as listing}
        <AssetCard data={listing} />{/each}
    </div>
  </div>
</div>
