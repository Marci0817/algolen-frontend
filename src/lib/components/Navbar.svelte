<script lang="ts">
  import ConnectButton from "$lib/components/ConnectButton.svelte";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import * as algosdk from "algosdk";
  import { walletAddress } from "$lib/stores/walletStore";
  import { env } from "$env/dynamic/public";

  //types
  import type LookupAssetByID from "algosdk/dist/types/client/v2/indexer/lookupAssetByID";
  import type LookupAccountAssets from "algosdk/dist/types/client/v2/indexer/lookupAccountAssets";

  let isShowSubMenu: boolean = false;

  const indexerClient = new algosdk.Indexer(
        env.PUBLIC_ALGOSDK_TOKEN || "",
        env.PUBLIC_ALGOSDK_SERVER,
        443
    );

  $: $walletAddress, fetchAssets();

  let assetsName: string[] = [];

  async function fetchAssets() {
    if ($walletAddress) {
      const HARD_CODED_ADDRESS =
        "RSKWGMK7SMZG24WRUPNOXL6PHKOWW7TQNNHKXY72OXWYTQQORISCR2KHOA";
      const accountAppLocalStates = await indexerClient
        .lookupAccountAssets(HARD_CODED_ADDRESS) //TODO: Change this address to $walletAddress
        .do();

      accountAppLocalStates.assets.forEach(
        async (item: LookupAccountAssets) => {
          const assetInfo: Record<string, any> = await indexerClient
            //@ts-ignore
            .lookupAssetByID(item["asset-id"]) // It should work with item.assetId but it cause error.
            .do();

          //if (assetInfo.asset.params.total === 1 && assetInfo.asset.params.decimals === 0) { // TODO: Delete this comment
          assetsName = [...assetsName, assetInfo.asset.params.name];
          //}
        }
      );
    }
  }
</script>

<div
  class="flex justify-between items-center mx-20 sm:mt-8 mt-2 font-primary text-white"
>
  <div class="">
    <h1
      class="font-extrabold text-4xl bg-clip-text bg-gradient-to-r text-transparent from-prim to-sec"
    >
      <p class="sm:hidden block">FRC</p>
      <p class="hidden sm:block">Fractic</p>
    </h1>
  </div>
  <div>
    <ul class="flex flex-row font-medium">
      <!-- svelte-ignore a11y-mouse-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        class="mx-4 flex-flex-col"
        on:mouseover={() => {
          isShowSubMenu = true;
        }}
        on:mouseleave={() => {
          isShowSubMenu = false;
        }}
      >
        <li class=" cursor-pointer">Fractionalize</li>

        {#if isShowSubMenu}
          <div
            in:fade={{ duration: 100 }}
            class="absolute bg-gray-100 rounded-md p-2 px-3 drop-shadow-md font-medium"
          >
            <ul>
              {#if assetsName.length > 0}
                {#each assetsName as assetName}
                  <li>{assetName}</li>
                {/each}
              {:else}
                <li class="text-black">You dont have assets</li>
              {/if}
            </ul>
          </div>
        {/if}
      </div>
      <li class="mx-4 cursor-pointer">Community</li>
      <li class="mx-4 cursor-pointer">Support</li>
    </ul>
  </div>
  <div>
    <ConnectButton />
  </div>
</div>
