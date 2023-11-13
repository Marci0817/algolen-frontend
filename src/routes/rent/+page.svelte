<script lang="ts">
  import SearchBar from "$lib/components/SearchBar.svelte";
  import RentCard from "$lib/components/RentCard.svelte";

  import { onMount } from "svelte";
  import algosdk from "algosdk";
  import { env } from "$env/dynamic/public";
  //types
  import Button from "$lib/components/shared/Button.svelte";
  import Navbar from "$lib/components/Navbar.svelte";

  import { fetchAsset, searchListings } from "$lib/utils/assetUtil";

  const indexerClient = new algosdk.Indexer(
    env.PUBLIC_ALGOSDK_TOKEN || "",
    env.PUBLIC_ALGOINDEXER_SERVER,
    env.PUBLIC_ALGOSDK_PORT
  );

  const algod = new algosdk.Algodv2(
    env.PUBLIC_ALGOSDK_TOKEN || "",
    env.PUBLIC_ALGOSDK_SERVER,
    env.PUBLIC_ALGOSDK_PORT
  );

  let listings: any[] = [];

  onMount(async () => {
    listings = await searchListings(algod, indexerClient);
  });

  const test = () => {
    console.log(listings);
  };

  const filter = async (searchTerm: string) => {
    listings = await searchListings(algod, indexerClient, searchTerm);
  };
</script>

<Navbar />
<div class="mx-12 mt-6">
  <div>
    <SearchBar onSearch={filter} className={`mb-8`} />
  </div>
  <div class="flex flex-wrap gap-6 justify-center">
    {#if listings.length === 0}
      <div class="text-white">No listings found</div>
    {/if}
    {#if listings.length > 0}
      {#each { length: 10 } as _, i}
        <div>
          <RentCard data={listings[0]} />
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
