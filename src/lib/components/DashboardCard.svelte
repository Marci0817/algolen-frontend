<!-- VerticalRentCard.svelte -->
<script lang="ts">
  import Button from "./shared/Button.svelte";
  import type { AlgolenListing } from "$lib/utils/types";
  enum Status {
    RENTED = "Rented",
    EXPIRED = "Expired",
  }

  interface Data {
    asset_id: string;
    name: string;
    url: string;
    deposit?: Number;
    price_per_day?: Number;
    max_duration_in_days?: Number;
    owner?: string;
    end_date?: Number;
    asset_owner?: string;
    asset_renter?: string;
  }

  export let data: Data = {
    asset_id: "Loading...",
    name: "Loading...",
    url: "",
  };

  const getTime = (time: Number) => {
    let date = new Date(time as number);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
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
        src={data.url}
        alt={data.name}
        class="h-auto w-16 object-cover rounded-xl"
      />
    </figure>
  </div>

  <div class="flex-grow ml-4">
    <div class="font-bold text-md">{data.name}</div>
    <div>
      {getTime(data.end_date)}
    </div>

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
