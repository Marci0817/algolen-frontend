<script>
  import Button from "./shared/Button.svelte";

  export let data = {
    name: "Loading...",
    image: "https://picsum.photos/200/300", // loading image
    rent: 0,
    deposit: 0,
  };

  const handleRentButtonClick = () => {
    console.log("Rent button clicked");
  };
</script>

<div
  class="w-56 bg-gray-900 text-white border-2 drop-shadow-neonPrim focus:drop-shadow-neon outline-none focus:border-sec border-prim font-primary rounded-2xl"
>
  <figure class="">
    <img src={data.image} alt={data.name} class="h-48 w-full rounded-t-xl" />
  </figure>

  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">{data.name}</div>

    <div class="flex flex-row justify-between mb-2">
      <div class="flex-col">
        <span>fee: {data.rent}</span>
        <span>depo: {data.deposit}</span>
      </div>

      <div class="flex justify-end">
        <Button onClick={handleRentButtonClick} text="Rent" />
      </div>
    </div>
  </div>
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
