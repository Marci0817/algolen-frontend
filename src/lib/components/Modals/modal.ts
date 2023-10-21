import type { ComponentProps, ComponentType, SvelteComponent } from "svelte";
import { writable } from "svelte/store";

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

export const modals = createModals();
