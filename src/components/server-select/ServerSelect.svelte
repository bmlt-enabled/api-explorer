<script lang="ts">
    import { getContext } from 'svelte';
    import { Label, Select } from 'flowbite-svelte';
    import type { GlobalContext } from '../../context/GlobalContext';
    import ServerDetails from './ServerDetails.svelte';

    let selectedServer = '';

    const { subscribe, getStuff } = getContext<typeof GlobalContext>('GlobalContext');
    let serverSelectItems: { name: string; value: string }[] = [];
    const aggregatorItem = { value: 'https://aggregator.bmltenabled.org/main_server', name: 'Aggregator' };
    subscribe(value => {
        serverSelectItems = value.aggregator.map(info => ({
            value: info.url,
            name: info.name
        }));
        serverSelectItems.unshift(aggregatorItem);
    });

    $: {
        if (selectedServer) {
            getStuff(selectedServer);
        }
    }
</script>

<div>
    <Label for="type">Please Select A Server</Label>
    <Select id="dataQueryResults" items={serverSelectItems} name="serverSelect" bind:value={selectedServer}/>
    <ServerDetails />
</div>
