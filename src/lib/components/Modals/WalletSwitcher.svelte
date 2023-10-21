<script lang="ts">
    import { walletAddress } from "$lib/stores/walletStore";
    import { modals } from "./modal";
    export let modalID: number;

    function handleConnectWalletClick(value: string) {
        walletAddress.handleConnectWalletClick(value);
    }
</script>

<div class="bg-blue-300 rounded-lg drop-shadow-lg p-14">
    <button
        class="text-lg font-semibold"
        on:click={() => handleConnectWalletClick("pera")}>Pera Wallet</button
    >
    <br />
    <button
        class="text-lg font-semibold"
        on:click={() => handleConnectWalletClick("defly")}>DeflyWallet</button
    >
</div>
