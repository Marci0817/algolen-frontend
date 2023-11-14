<script lang="ts">
  import { env } from "$env/dynamic/public";
  import { walletAddress } from "$lib/stores/walletStore";
  import { AlgolenClient } from "$lib/utils/AlgolenClient";
  import type { NFT } from "$lib/utils/types";
  import { transactionSignerAccount } from "@algorandfoundation/algokit-utils";
  import { modals } from "./modal";
  import algosdk from "algosdk";

  const algod = new algosdk.Algodv2(
    env.PUBLIC_ALGOSDK_TOKEN || "",
    env.PUBLIC_ALGOSDK_SERVER,
    env.PUBLIC_ALGOSDK_PORT
  );
  const indexer = new algosdk.Indexer(
    env.PUBLIC_ALGOSDK_TOKEN || "",
    env.PUBLIC_ALGOSDK_SERVER,
    env.PUBLIC_ALGOSDK_PORT
  );

  export let modalID;
  export let nft: NFT;

  async function lendFlow() {
    let signer = transactionSignerAccount(
      walletAddress.signer,
      walletAddress.getValue()
    );
    let client = new AlgolenClient(
      parseInt(env.PUBLIC_APP_ID),
      env.PUBLIC_APP_ADDRESS,
      signer,
      algod,
      indexer
    );
    let optedIn = await client.check_opted_into_asset(nft.asset_id);
    if (!optedIn) {
      await client.opt_in_to_asset(nft.asset_id);
    }
    await client.listNft(nft.asset_id, 0, 0, 180);
  }
</script>

<div class="bg-white flex flex-col p-1 justify-between">
  <div class="flex flex-row justify-between">
    <div>
      <img
        src={"https://ipfs.io/ipfs/bafybeid2ej622yaudvk65vlio6sk56mitrd4qmcbzkh3yl6kf7mw6rzl4u#i"}
        alt={""}
        class="w-64 rounded-lg"
      />
    </div>
    <div class="">
      <button
        on:click={() => modals.close(modalID)}
        class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-full"
      >
        X
      </button>
      <div class="">name</div>
      <div class="">asdasda sdasdsadastasdteast4w624t2w4w</div>
      <div class="">price/day</div>
      <div class="">
        <div class="w-72">
          <div class="relative h-10 w-full min-w-[200px]">
            <div
              class="absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500"
            >
              <p>ALGO</p>
            </div>
            <input
              class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder="0"
              type="number"
            />
          </div>
        </div>
      </div>
      <div class="">deposit</div>
      <div class="">
        <div class="w-72">
          <div class="relative h-10 w-full min-w-[200px]">
            <div
              class="absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500"
            >
              <p>ALGO</p>
            </div>
            <input
              class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder="0"
              type="number"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="">max length</div>
  <div class="w-max">
    <input class="w-max" type="range" min="1" max="180" />
  </div>
  <div class="">disclaimer</div>
  <div class="flex flex-row">
    <div class="">
      <input type="checkbox" class="default:ring-2" />
    </div>
    <div class=" ">
      <button
        on:click={lendFlow}
        class="border-1 rounded-lg bg-black border-2 border-sec drop-shadow-neon text-sec font-bold px-4 py-2 m-4"
        ><p class="bg-clip-text drop-shadow-neon">Lend</p></button
      >
    </div>
  </div>
</div>
