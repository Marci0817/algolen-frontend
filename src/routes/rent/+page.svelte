<script lang="ts">
    import SearchBar from '$lib/components/SearchBar.svelte'
    import RentCard from '$lib/components/RentCard.svelte'

    import { onMount } from 'svelte'
    import algosdk from 'algosdk'
    import { env } from '$env/dynamic/public'
    import Navbar from '$lib/components/Navbar.svelte'

    import { searchListings } from '$lib/utils/assetUtil'

    const indexerClient = new algosdk.Indexer(
        env.PUBLIC_ALGOSDK_TOKEN || '',
        env.PUBLIC_ALGOINDEXER_SERVER,
        env.PUBLIC_ALGOSDK_PORT
    )

    const algod = new algosdk.Algodv2(
        env.PUBLIC_ALGOSDK_TOKEN || '',
        env.PUBLIC_ALGOSDK_SERVER,
        env.PUBLIC_ALGOSDK_PORT
    )

    let listings: any[] = []
    let loading = true

    onMount(async () => {
        listings = await searchListings(algod, indexerClient)
        loading = false
    })

    const filter = async (searchTerm: string) => {
        listings = await searchListings(algod, indexerClient, searchTerm)
    }
</script>

<Navbar />
<div class="mx-6 md:mx-12 mt-6">
    <div class="md:block flex items-center justify-center">
        <SearchBar onSearch={filter} className={`mb-8`} />
    </div>
    <div class="flex flex-wrap gap-6 justify-center">
        {#if loading}
            <div class="text-white text-2xl">Loading...</div>
        {:else if listings.length === 0}
            <div class="text-white">No listings found</div>
        {:else}
            {#each listings as listing}
                <div>
                    <RentCard data={listing} />
                </div>
            {/each}
        {/if}
    </div>
</div>
