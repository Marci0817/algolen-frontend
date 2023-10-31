<script lang="ts">
    import { goto } from "$app/navigation";
</script>

<div class="flex flex-col justify-center items-center mt-60 font-primary">
    <p class="text-prim font-bold text-center text-2xl">
        Welcome to the Future of Web3:<br /> Your Gateway to Innovation!
    </p>
    <button
        on:click={() => goto("/app")}
        class="mt-4 py-2 px-5 rounded-lg drop-shadow-neon text-white font-bold bg-sec"
        >Launch app</button
    >
</div>
