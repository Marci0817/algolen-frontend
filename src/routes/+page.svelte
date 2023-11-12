<script lang="ts">
    import { goto } from "$app/navigation";
    import FlowChart from "$lib/components/FlowChart.svelte";
</script>

<div
    class="flex flex-col justify-center items-center mt-32 font-primary mx-auto"
>
    <h1
        class="font-extrabold text-6xl bg-clip-text bg-gradient-to-r text-transparent from-prim to-sec"
    >
        <p class="sm:hidden block">ALO</p>
        <p class="hidden sm:block">Algolen</p>
    </h1>
    <p class="text-prim font-semibold text-center w-1/2 text-xl mt-16">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
    </p>
    <button
        on:click={() => goto("/app")}
        class="py-3 px-8 rounded-lg drop-shadow-neon text-white font-bold bg-sec mt-12"
        >Launch app</button
    >
    <h1 class="font-bold text-white text-2xl mt-16">How NFT renting works</h1>
    <div class="mt-16">
        <FlowChart />
    </div>
</div>
