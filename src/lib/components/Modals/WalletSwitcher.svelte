<script lang="ts">
    import { walletAddress } from '$lib/stores/walletStore'
    import { modals } from './modal'
    export let modalID: number

    //images
    import PeraWalletImage from '$lib/assets/pera.png'
    import DeflyWalletImage from '$lib/assets/defly.jpg'

    function handleConnectWalletClick(value: string) {
        walletAddress.handleConnectWalletClick(value)
        modals.close()
    }
</script>

<div
    class="bg-gray-900 text-white border-2 drop-shadow-neonPrim border-prim font-primary rounded-2xl py-7 px-16"
>
    <h1 class="text-center text-lg font-semibold">Connect your wallet</h1>
    <div class="flex gap-8 my-6">
        <button
            on:click={() => handleConnectWalletClick('pera')}
            class="flex flex-col justify-center items-center hover:scale-105 hover:animate-pulse"
        >
            <img
                src={PeraWalletImage}
                class="w-14 h-auto rounded-lg drop-shadow-md"
                alt="Pera Wallet Icon"
            />
            <p class="text-md mt-2">Pera Wallet</p>
        </button>
        <button
            on:click={() => handleConnectWalletClick('defly')}
            class="flex flex-col justify-center items-center hover:scale-105 hover:animate-pulse"
        >
            <img
                src={DeflyWalletImage}
                class="w-14 h-auto rounded-lg drop-shadow-md"
                alt="Pera Wallet Icon"
            />
            <p class="text-md mt-2">Defly Wallet</p>
        </button>
    </div>
</div>
