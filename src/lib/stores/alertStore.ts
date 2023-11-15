import {  writable } from 'svelte/store'

export interface Alert {
	id?: number;
	//closable?: boolean;
	timeout?: number;
	type: "info" | "error" | "success";
	title: string;
	desc: string;
}

function createAlerts() {


	const { subscribe, update } = writable<Alert[]>([]);

    return {
        subscribe,
        /*close: (id) => {
            update((all) => all.filter((t) => t.id !== id));
        },*/
        add: (notification: Alert) => {
            const id = Math.floor(Math.random() * 10000);
            const defaults = {
                id,
                //closable: true,
                timeout: 3000
            };
			notification = { ...defaults, ...notification }
            update((all) => {
                const index = all.findIndex(o => (o.title === notification.title && o.type === notification.type));
                if (index < 0) {
                    return [...all, { ...defaults, ...notification } ];
                }
                else {
                    return [...all];
                }
            });
            if (notification.timeout && notification.timeout > 0) {
                setTimeout(() => update((all) => all.filter((t) => t.id !== id)), notification.timeout);
            }
        }
    };

}

export const alerts = createAlerts();