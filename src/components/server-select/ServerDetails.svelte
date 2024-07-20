<script lang="ts">
    import { getContext } from 'svelte';
    import type { GlobalContext } from '../../context/GlobalContext';
    import type { ServerInfo } from '../../types/AggregatorTypes';
    
    let serverDetails: ServerInfo[] | null = null;
    let rootServerUrl: string | null = null;

    const { subscribe } = getContext<typeof GlobalContext>('GlobalContext');

    subscribe(value => {
        serverDetails = value.serverDetails;
        rootServerUrl = value.root_server_url;
    });
</script>

<div class="mt-3">
    {#if serverDetails != null}
        {#each serverDetails as info}
            <div class="server-details">
                <p class="mb-0 text-secondary text-small font-weight-bold">
                    Connected to {rootServerUrl}
                </p>
                <p class="mb-0 text-secondary text-small font-weight-bold">
                    version: {info.version}
                </p>
            </div>
        {/each}
    {/if}
</div>
