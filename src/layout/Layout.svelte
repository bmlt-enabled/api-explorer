<script lang="ts">
    import { onDestroy } from 'svelte';
    import Header from '../partials/Header.svelte';
    import QueryButton from '../components/query-string/QueryButton.svelte';
    import { GlobalContext } from '../context/GlobalContext';

    interface GlobalContextType {
        isMatched: boolean;
        root_server_url: string | null;
    }

    let isMatched: boolean;
    let rootServerUrl: string | null;

    const unsubscribe = GlobalContext.subscribe((value: GlobalContextType) => {
        isMatched = value.isMatched;
        rootServerUrl = value.root_server_url;
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

<Header />
{#if isMatched}
    <div class="main-wrapper">
        {#if rootServerUrl !== null}
            <div class="query-container">
                <QueryButton />
            </div>
        {/if}
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <!-- <Sidebar /> -->
                </div>
                <div class="col-md-8">
                    <!-- <QueryScreen /> -->
                </div>
            </div>
        </div>
    </div>
{/if}
