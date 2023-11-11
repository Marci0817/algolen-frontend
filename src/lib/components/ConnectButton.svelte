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
    <button class="cursor-pointer" on:click={copyWallet}>
        {walletAddress?.getFormattedValue()}
    </button>
    <br />
    <button
        on:click={walletDisconnect}
        class="border-1 rounded-lg bg-red-500 px-4 py-2 drop-shadow-lg text-white m-4 hover:scale-105 duration-150 hover:drop-shadow-xl"
        >Disconnect</button
    >
{:else}
    <button
        on:click={walletConnect}
        class="border-1 rounded-lg bg-black border-2 border-sec drop-shadow-neon text-sec font-bold px-4 py-2 m-4"
        ><p class="bg-clip-text drop-shadow-neon">Connect Wallet</p></button
    >
{/if}
