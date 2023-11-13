<script lang="ts">
    export let onClick: () => void;
    export let text: string;
    export let className: string = "";
</script>

<button
    on:click={onClick}
    class={`bg-gray-900 text-white border-2 drop-shadow-neonPrim hover:border-sec hover:drop-shadow-neon  border-prim font-primary rounded-lg ml-2 py-2 px-3 ${className}}`}
    type="button"
>
    {text}
</button>
