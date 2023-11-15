<script lang="ts">
    import { goto } from '$app/navigation'
</script>

<ul class="flex flex-col md:flex-row font-medium">
    <li class="mx-auto md:mx-5 cursor-pointer">
        <button on:click={() => goto('/rent')}>Rent</button>
    </li>
    <li class="mx-auto md:mx-5 cursor-pointer">
        <button on:click={() => goto('/dashboard')}>Dashboard</button>
    </li>
</ul>
