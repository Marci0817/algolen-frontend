<script lang="ts">
    import ConnectButton from "$lib/components/ConnectButton.svelte";

    import { modals } from "$lib/components/Modals/modal";
    import Assets from "./Modals/Assets.svelte";

    function openFractionalize() {
        modals.push(Assets, {});
    }
</script>

<div
    class="flex justify-between items-center mx-20 sm:mt-8 mt-2 font-primary text-white"
>
    <div class="">
        <h1
            class="font-extrabold text-5xl sm:text-4xl bg-clip-text bg-gradient-to-r text-transparent from-prim to-sec"
        >
            <p class="sm:hidden block">FRC</p>
            <p class="hidden sm:block">Fractic</p>
        </h1>
    </div>
    <div>
        <ul class="flex flex-row font-medium">
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="mx-4 flex-flex-col">
                <li class=" cursor-pointer">
                    <button on:click={openFractionalize}>Fractionalize</button>
                </li>
            </div>
            <li class="mx-4 cursor-pointer">Community</li>
            <li class="mx-4 cursor-pointer">Support</li>
        </ul>
    </div>
    <div>
        <ConnectButton />
    </div>
</div>
