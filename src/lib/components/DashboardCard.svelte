<!-- VerticalRentCard.svelte -->
<script lang="ts">
  import Button from "./shared/Button.svelte";

  enum Status {
    RENTED = "Rented",
    EXPIRED = "Expired",
  }

  interface Data {
    name: string;
    image: string;
    time?: number;
    rent?: number;
    status?: Status;
  }

  export let data: Data = {
    name: "Loading...",
    image: "https://picsum.photos/200/300", // loading image
  };

  const handleClick = () => {
    console.log("Button clicked");
    // You can perform further actions here
  };
</script>

<div
  class="flex w-72 p-4 justify-center items-center bg-gray-900 text-white border-2 drop-shadow-neonPrim focus:drop-shadow-neon outline-none focus:border-sec border-prim font-primary rounded-2xl"
>
  <div class="flex-shrink-0">
    <figure class="">
      <img
        src={data.image}
        alt={data.name}
        class="h-auto w-16 object-cover rounded-xl"
      />
    </figure>
  </div>

  <div class="flex-grow ml-4">
    <div class="font-bold text-md">{data.name}</div>

    <div class="flex flex-row items-center justify-between">
      <div class="flex-col text-sm" />

      <div class="flex items-center justify-end">
        <Button onClick={handleClick} text="Rent" />
      </div>
    </div>
  </div>
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
