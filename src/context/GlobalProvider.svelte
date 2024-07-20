<script lang="ts">
    import { setContext } from 'svelte';
    import { GlobalContext } from './GlobalContext';

    setContext('GlobalContext', GlobalContext);
</script>

<slot />
