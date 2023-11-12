<script lang="ts">
    import { walletAddress } from "$lib/stores/walletStore";
    import { modals } from "$lib/components/Modals/modal";
    import WalletSwitcher from "$lib/components/Modals/WalletSwitcher.svelte";

    function walletConnect() {
        modals.push(WalletSwitcher, {});
    }

    function walletDisconnect() {
        walletAddress?.handleDisconnectWalletClick();
    }

    function copyWallet() {
        navigator.clipboard.writeText(
            typeof walletAddress?.getFormattedValue() === "string"
                ? walletAddress.getValue()
                : ""
        );
    }
</script>

{#if $walletAddress}
    <div class="md:hidden flex flex-col mt-8">
        <button class="cursor-pointer" on:click={copyWallet}>
            {walletAddress?.getFormattedValue()}
        </button>
        <button
            on:click={walletDisconnect}
            class="md:hidden mx-auto border-1 rounded-lg text-prim font-bold px-4 py-2 flex items-center gap-2"
        >
            disconnect</button
        >
    </div>
    <div class="hidden md:block">
        <button class="cursor-pointer" on:click={copyWallet}>
            {walletAddress?.getFormattedValue()}
        </button>
        <button
            on:click={walletDisconnect}
            class="border-0 rounded-lg bg-black border-prim drop-shadow-prim text-prim font-bold px-4 py-2 m-4"
            ><p class="bg-clip-text drop-shadow-prim">disconnect</p></button
        >
    </div>
{:else}
    <div>
        <button
            on:click={walletConnect}
            class="hidden md:block border-1 rounded-lg bg-black border-2 border-sec drop-shadow-neon text-sec font-bold px-4 py-2 m-4"
            ><p class="bg-clip-text drop-shadow-neon">connect</p></button
        >
        <button
            on:click={walletConnect}
            class="md:hidden mx-auto mt-4 border-1 rounded-lg text-sec font-bold px-4 py-2 m-4 flex items-center gap-2"
            ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                />
            </svg>
            connect</button
        >
    </div>
{/if}
