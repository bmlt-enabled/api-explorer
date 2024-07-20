<script lang="ts">
    import { QueryContext } from './QueryContext';
    import { setContext } from 'svelte';

    setContext('QueryContext', QueryContext);
</script>

<slot />
