<script lang="ts">
    import { onMount } from 'svelte';
    import GlobalProvider from './context/GlobalProvider.svelte';
    import Layout from './layout/Layout.svelte';
    import { GlobalContext } from './context/GlobalContext';
    import SpinnerModal from './components/SpinnerModal.svelte';

    const { setAggregator } = GlobalContext;

    onMount(() => {
        setAggregator();
    });
</script>

<GlobalProvider>
    <div class="App">
        <Layout />
    </div>
</GlobalProvider>

<SpinnerModal />
