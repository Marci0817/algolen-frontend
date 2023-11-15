<script>
    import "../app.css";
    import Modal from "$lib/components/Modals/Modal.svelte";
    import Alert from "$lib/components/Alerts/Alert.svelte";
</script>

<svelte:head>
    <meta charset="UTF-8" />
    <title>Algolen | algolen.com</title>
    <meta
        name="keywords"
        content="web3, web3 service, service, algorand service, algorand webservice, algo, algorand, algorand app, algolen, lending nft, renting, dashboard, nft"
    />
    <meta
        name="description"
        content="Rent a NFT on Algolen. Fast and simple."
    />
</svelte:head>
<slot />
<Modal />
<Alert />
