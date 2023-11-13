<script lang="ts">
    import Button from "./shared/Button.svelte";
    import type { AlgolenListing } from "$lib/utils/boxUtil";

    export let data: AlgolenListing = {
        asset_id: "Loading...",
        name: "Loading...",
        url: "",
        deposit: 0,
        price_per_day: 0,
        max_duration_in_days: 0,
        owner: "",
    };

    const PLACEHOLDER_IMAGE =
        "https://ipfs.algonft.tools/ipfs/bafybeiatk5vsz42tuurqyclvlse3i7cn6jzg4cgkoqogf7kcmauzi6skze/782.png#i";

    const handleRentButtonClick = () => {
        console.log("Rent button clicked");
    };
</script>

<div
    class="w-56 bg-gray-900 text-white border-2 drop-shadow-2xl outline-none border-gray-800 font-primary rounded-lg"
>
    <figure class="">
        <img
            src={PLACEHOLDER_IMAGE}
            alt={data.asset_id}
            class="h-48 w-full rounded-t-lg"
        />
    </figure>

    <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{data.name}</div>

        <div class="flex flex-col justify-between mb-2">
            <div class="my-3">
                <div>
                    <p class="font-semibold text-gray-400">fee</p>
                    <p class=" ml-3">{data.price_per_day}</p>
                </div>
                <div>
                    <p class="font-semibold text-gray-400">depo</p>
                    <p class=" ml-3">{data.deposit}</p>
                </div>
            </div>
            <Button
                className="h-6"
                onClick={handleRentButtonClick}
                text="Rent"
            />
        </div>
    </div>
</div>
