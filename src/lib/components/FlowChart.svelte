<script lang="ts">
    import { fade } from "svelte/transition";
    import { inview } from "svelte-inview";
    import cn from "$lib/utils/className";
    import type {
        ObserverEventDetails,
        ScrollDirection,
        Options,
    } from "svelte-inview";
    import Img1 from "$lib/assets/img1.png";
    import Img2 from "$lib/assets/img2.png";
    import Img3 from "$lib/assets/img3.png";
    import Img4 from "$lib/assets/img4.png";
    import Img5 from "$lib/assets/img5.png";

    const items = [
        {
            id: 1,
            label: "Lender lists nft",
            img: Img1,
            isSeller: true,
            isInView: false,
        },
        {
            id: 2,
            label: "User selects length of borrowing",
            img: Img2,
            isSeller: false,
            isInView: false,
        },
        {
            id: 3,
            label: "User pays deposit and daily rent fee",
            img: Img3,
            isSeller: false,
            isInView: false,
        },
        {
            id: 4,
            label: "If borrower returns the nft in time, gets back the deposit",
            img: Img4,
            isSeller: true,
            isInView: false,
        },
        {
            id: 5,
            label: "If borrower runs out of time, lender takes the deposit",
            img: Img5,
            isSeller: true,
            isInView: false,
        },
    ];

    const options: Options = {
        rootMargin: "-0px",
        unobserveOnEnter: true,
    };

    const handleChange = (
        { detail }: CustomEvent<ObserverEventDetails>,
        index: number
    ) => {
        items[index].isInView = detail.inView;
    };
</script>

{#each items as item, index (index)}
    <div
        use:inview={options}
        on:inview_change={(detail) => handleChange(detail, index)}
        class={`text-white flex flex-col items-center justify-center border-1 transition  delay-300 duration-1000 rounded-lg bg-black border-2 font-bold mx-auto w-1/2 md:w-1/3 lg:w-1/4 text-center p-4 mt-32 ${
            item.isSeller
                ? "border-sec drop-shadow-neon"
                : "border-prim drop-shadow-neonPrim"
        } ${
            item.isInView
                ? cn(
                      "opacity-100",
                      index % 2 == 0
                          ? "translate-x-0 md:translate-x-1/3"
                          : "translate-x-0 md:-translate-x-1/3"
                  )
                : cn(
                      "opacity-0",
                      index % 2 == 0 ? "translate-x-full" : "-translate-x-full"
                  )
        }

        
        `}
    >
        <h1 class="text-2xl text-gray-500 mx-4">{item.id}</h1>
        <div class="flex items-center justify-center gap-2">
            <img src={item.img} alt="" class="w-64 p-4">
            <p class="text-2xl">{item.label}</p>
        </div>
    </div>
{/each}

<style>
</style>
