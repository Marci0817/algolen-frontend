import {  writable } from 'svelte/store'


function showLoader() {
    
    const { subscribe, update } = writable<boolean>(false);

    return {
        subscribe,
        show: (item: boolean) =>{
            update((all) => {
                return item;
            });
        }
    }
}

export const loader = showLoader();