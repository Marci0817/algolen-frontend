<script lang="ts">
    import { goto } from "$app/navigation";
</script>

<div class="flex flex-col justify-center items-center mt-60 font-quicksand">
    <p class="text-red-500 text-xl">
        Get started by clicking on the Launch button
    </p>
    <button
        on:click={() => goto("/app")}
        class="mt-4 py-2 px-5 rounded-lg bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 drop-shadow-lg text-white font-semibold"
        >Launch app</button
    >
</div>
