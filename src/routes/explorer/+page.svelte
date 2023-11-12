<script lang="ts">
  import SearchBar from "$lib/components/SearchBar.svelte";
  import RentCard from "$lib/components/RentCard.svelte";

  import { walletAddress } from "$lib/stores/walletStore";
  import { onMount } from "svelte";
  import * as algosdk from "algosdk";
  import { env } from "$env/dynamic/public";
  //types
  import type LookupAccountAssets from "algosdk/dist/types/client/v2/indexer/lookupAccountAssets";
  import Button from "$lib/components/shared/Button.svelte";
  import DashboardCard from "$lib/components/DashboardCard.svelte";
  import Navbar from "$lib/components/Navbar.svelte";

  const indexerClient = new algosdk.Indexer(
    env.PUBLIC_ALGOSDK_TOKEN || "",
    env.PUBLIC_ALGOSDK_SERVER,
    env.PUBLIC_ALGOSDK_PORT
  );
  const algod = new algosdk.Algodv2(
    env.PUBLIC_ALGOSDK_TOKEN || "",
    env.PUBLIC_ALGOSDK_SERVER,
    env.PUBLIC_ALGOSDK_PORT
  );

  let assetsName: any[] = [];

  onMount(async () => {
    await fetchAssets();
  });

  let cardData = {
    name: "Snape #782",
    image:
      "https://ipfs.algonft.tools/ipfs/bafybeiatk5vsz42tuurqyclvlse3i7cn6jzg4cgkoqogf7kcmauzi6skze/782.png#i",
    rent: 100,
    deposit: 1000,
  };

  async function fetchAssets() {
    const accountAppLocalStates = await indexerClient
      .searchForApplicationBoxes(478327734)
      .limit(5)
      .do();
    accountAppLocalStates.boxes.map((box) => {
      assetsName = [...assetsName, box.name];
      console.log(box.name);
      return box.name;
    });
  }

  async function fetchBox(boxName) {
    const boxResponse = await indexerClient
      .lookupApplicationBoxByIDandName(478327734, boxName)
      .do();
    const boxValue = boxResponse.value;
    const codec = algosdk.ABIType.from("(uint64,uint64,uint64,address)");
    console.log(codec.decode(boxValue));
  }

  const test = () => {
    console.log(fetchAssets());
  };
</script>

<Navbar />
<SearchBar />
<div class="mx-12">
  <Button onClick={test} text="Rent" />
  <Button onClick={() => fetchBox(assetsName[0])} text="fetch" />

  <DashboardCard data={cardData} />

  {#each assetsName as _, i}
    <div>
      <RentCard data={cardData} />
    </div>
  {/each}
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
