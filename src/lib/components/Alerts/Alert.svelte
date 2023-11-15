<script lang="ts">
    import AlertCard from "$lib/components/Alerts/AlertBase.svelte";
    import { alerts } from "$lib/stores/alertStore";
</script>

<div class="absolute top-0 left-0 right-0 mx-auto">
    {#each $alerts as alert}
        <AlertCard {alert} />
    {/each}
</div>
