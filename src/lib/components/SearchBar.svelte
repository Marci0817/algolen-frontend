<script>
    import Button from "./shared/Button.svelte";
    export let onSearch;
    let searchTerm = "";

    export let className = "";

    function handleSearch() {
        onSearch(searchTerm);
    }
</script>

<form on:submit={handleSearch} class={`${className}`}>
    <div class="search-bar">
        <input
            class="bg-gray-900 text-white border-2 drop-shadow-2xl outline-none border-gray-800 font-primary rounded-lg py-2 px-2"
            bind:value={searchTerm}
            placeholder="Search..."
        />
        <Button onClick={handleSearch} text="Search" />
    </div>
</form>
