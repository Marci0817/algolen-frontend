<script lang="ts">
    import { fade } from 'svelte/transition'
    import { clickOutside } from '$lib/utils/clickOutside'
    import { modals } from './modal'
</script>

{#if $modals.length > 0}
    <div
        transition:fade|local={{ duration: 150 }}
        class="modal_container fixed left-0 top-0 z-50 h-screen w-full bg-black bg-opacity-80"
    >
        {#each $modals as modal, i}
            <div
                transition:fade|local={{ duration: 150 }}
                class="absolute inset-0 flex items-center justify-center"
            >
                <div
                    use:clickOutside={() =>
                        i === $modals.length - 1 && modals.close()}
                >
                    <div>
                        <svelte:component
                            this={modal.component}
                            {...modal.props}
                        />
                    </div>
                </div>
            </div>
        {/each}
    </div>
{/if}
