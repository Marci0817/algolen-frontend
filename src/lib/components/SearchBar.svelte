<!-- SearchBar.svelte -->
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
      class="bg-gray-900 text-white border-2 drop-shadow-neonPrim focus:drop-shadow-neon outline-none focus:border-sec border-prim font-primary rounded-2xl py-2 px-2"
      bind:value={searchTerm}
      placeholder="Search..."
    />
    <Button onClick={handleSearch} text="Search" />
  </div>
</form>

<style>
  /* Add your styles here */
</style>
