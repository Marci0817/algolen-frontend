import type { AlgolenListing, NFT } from "$lib/utils/types";
import type { ComponentProps, ComponentType, SvelteComponent } from "svelte";
import { writable } from "svelte/store";
import LendModal from "./LendModal.svelte";
import RentModal from "./RentModal.svelte";
import type { Algodv2, Indexer } from "algosdk/dist/types/main";

type Modal<T extends SvelteComponent> = {
    id: number;
    component: ComponentType<T>;
    props: ComponentProps<T>;
};

function createModals() {
    const { subscribe, update } = writable<Modal<SvelteComponent>[]>([]);

    return {
        subscribe,
        push: <T extends SvelteComponent>(
            component: ComponentType<T>,
            props: Omit<ComponentProps<T>, "modalID">
        ) => {
            const id = Date.now();
            update((p) => [
                ...p,
                {
                    id,
                    component,
                    props: {
                        modalID: id,
                        ...props,
                    },
                },
            ]);
        },
        close: (id?: number) => {
            update((p) => (id ? p.filter((m) => m.id !== id) : p.slice(0, -1)));
        },
    };
}

export function openLendModal(nft: NFT){
    const props: ComponentProps<LendModal> = { nft: nft };
    modals.push(LendModal, props);
}

export function openRentModal(listing: AlgolenListing){
    const props: ComponentProps<RentModal> = { listing: listing };
    modals.push(RentModal, props);
}

export const modals = createModals();
