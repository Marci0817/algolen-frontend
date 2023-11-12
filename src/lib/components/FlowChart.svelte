<script lang="ts">
    import ArrowDown from "$lib/assets/arrowDown.png";
    import ArrowTwo from "$lib/assets/arrowTwo.png";
</script>

<div class="text-white font-primary">
    <div
        class="bg-white px-8 py-3 rounded-lg text-black shadow-prim shadow-md w-64 mx-auto"
    >
        <span class="font-bold font-sans">1.</span> Lender lists nft
    </div>
    <img src={ArrowDown} alt="arrow" class="mx-auto my-2" />
    <div class="bg-white px-8 py-3 rounded-lg text-black shadow-prim shadow-md">
        <span class="font-bold font-sans">2.</span> User selects length for borrowing
    </div>
    <img src={ArrowDown} alt="arrow" class="mx-auto my-2" />
    <div class="bg-white px-8 py-3 rounded-lg text-black shadow-prim shadow-md">
        <span class="font-bold font-sans">3.</span> User pays deposit daily rent
        fee
    </div>
    <div class="flex items-center justify-center">
        <p>Borrower returns the nft in time</p>
        <img src={ArrowTwo} alt="arrow" class="mx-auto my-2" />
        <p>Borrower runs out of time</p>
    </div>
    <div class="grid grid-cols-2 gap-8">
        <div
            class="bg-white px-8 py-3 rounded-lg text-black shadow-prim shadow-md"
        >
            <span class="font-bold font-sans" /> Gets back the deposit fee
        </div>
        <div
            class="bg-white px-8 py-3 rounded-lg text-black shadow-prim shadow-md"
        >
            <span class="font-bold font-sans" /> Lender takes the deposit fee
        </div>
    </div>
</div>
