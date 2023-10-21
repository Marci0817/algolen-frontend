import { PeraWalletConnect } from "@perawallet/connect";
import { DeflyWalletConnect } from "@blockshake/defly-connect";
import { get, writable } from "svelte/store";
import { modals } from "$lib/components/Modals/modal";
import ErrorModal from "$lib/components/Modals/ErrorModal.svelte";

function connectWallet() {
    const peraWallet = new PeraWalletConnect();
    const deflyWallet = new DeflyWalletConnect();

    const store = writable(null);
    const { subscribe, set, update } = store;

    function handleConnectWalletClick(value: string) {
        if (value === "pera") {
            peraWallet
                .connect()
                .then((newAccounts) => {
                    peraWallet.connector?.on(
                        "disconnect",
                        handleDisconnectWalletClick
                    );

                    setAccountAddress(newAccounts[0]);
                })
                .catch((error) => {
                    // TODO: Handle close error
                    if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
                        console.error(error);
                        modals.push(ErrorModal, { error });
                    }
                });
        } else if (value === "defly") {
            deflyWallet
                .connect()
                .then((newAccounts) => {
                    deflyWallet.connector?.on(
                        "disconnect",
                        handleDisconnectWalletClick
                    );

                    setAccountAddress(newAccounts[0]);
                })
                .catch((error) => {
                    // TODO: Handle close error
                    if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
                        console.error(error);
                    }
                });
        }
    }

    function handleDisconnectWalletClick() {
        peraWallet.disconnect();
        deflyWallet.disconnect();
        setAccountAddress(null);
    }

    function setAccountAddress(newAddress: any) {
        set(newAddress);
    }

    //Reconnect automatically
    peraWallet
        .reconnectSession()
        .then((accounts) => {
            peraWallet.connector?.on("disconnect", handleDisconnectWalletClick);

            if (peraWallet.isConnected && accounts.length) {
                setAccountAddress(accounts[0]);
            }
        })
        .catch((error) => console.error(error));

    deflyWallet.reconnectSession().then((accounts) => {
        deflyWallet.connector?.on("disconnect", handleDisconnectWalletClick);

        if (accounts.length) {
            setAccountAddress(accounts[0]);
        }
    });

    function formattedValue(value: string | null): string {
        return value === null
            ? "Not defined."
            : value.substring(0, 4) + "..." + value.substring(value.length - 4);
    }

    return {
        subscribe,
        handleConnectWalletClick,
        handleDisconnectWalletClick,
        getFormattedValue: () => formattedValue(get(store)),
    };
}

export const walletAddress = connectWallet();
