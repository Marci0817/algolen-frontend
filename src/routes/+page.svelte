<script lang="ts">
    import { goto } from "$app/navigation";
    import FlowChart from "$lib/components/FlowChart.svelte";
</script>

<div
    class="flex flex-col mt-32 font-primary mx-auto md:items-start items-center max-w-5xl"
>
    <h1
        class="font-extrabold text-8xl bg-clip-text bg-gradient-to-r text-transparent from-prim to-sec"
    >
        <p class="">Algolen</p>
    </h1>
    <p
        class="text-prim font-medium text-xl mt-16 md:mx-0 mx-10 md:text-left text-center max-w-2xl"
    >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not.
    </p>
    <div class="flex items-center mt-12 gap-6">
        <button
            on:click={() => goto("/rent")}
            class="py-3 px-8 rounded-lg drop-shadow-neon text-white font-bold bg-sec"
            >Launch app</button
        >
    </div>
    <h1 class="font-bold text-white text-4xl mt-32 text-center md:mx-auto mx-0">
        How NFT renting works
    </h1>
</div>
<div class="mb-32">
    <FlowChart />
</div>
