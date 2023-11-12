<!-- NeonButton.svelte -->
<script lang="ts">
  export let onClick: () => void;
  export let text: string;
</script>

<button
  on:click={onClick}
  class="bg-gray-900 text-white border-2 drop-shadow-neonPrim hover:drop-shadow-neon hover:border-sec border-prim font-primary rounded-2xl ml-2 py-2 px-3"
  type="button"
>
  {text}
</button>
