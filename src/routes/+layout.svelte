<script>
    import "../app.css";
    import Modal from "$lib/components/Modals/Modal.svelte";
</script>

<svelte:head>
    <meta charset="UTF-8" />
    <title>Boilerplate | localhost.com</title>
    <meta
        name="keywords"
        content="web3, web3 service, service, algorand service, algorand webservice, algo, algorand, algorand app"
    />
    <meta name="description" content="Service about..." />
</svelte:head>
<slot />
<Modal />
