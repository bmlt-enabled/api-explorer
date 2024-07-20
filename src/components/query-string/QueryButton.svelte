<script lang="ts">
    import { writable } from 'svelte/store';
    import { Button } from 'flowbite-svelte';
    import Query from './Query.svelte';

    const queryTrigger = writable(false);
    const btnText = writable(true);

    function triggerQueryString() {
        queryTrigger.update(value => !value);
        btnText.update(value => !value);
    }
</script>

<div class="query-button-container text-center" class:mb-0={$btnText} class:mb-3={!$btnText}>
    <Button on:click={triggerQueryString}>
        {#if $btnText} Show {:else} Hide {/if} Query String
    </Button>
</div>
{#if $queryTrigger}
    <Query />
{/if}

<style>
    .mb-0 {
        margin-bottom: 0;
    }
    .mb-3 {
        margin-bottom: 1rem; /* Adjust as needed */
    }
</style>
