<script lang="ts">
    import { Navbar, NavBrand } from 'flowbite-svelte';
    import ServerSelect from '../components/server-select/ServerSelect.svelte';
    import DarkMode from '../components/DarkMode.svelte'

    let isDarkMode: boolean = false;
</script>

<Navbar>
    <NavBrand href="#/">
        <img width="300" src={isDarkMode ? "logo-dark.svg" : "logo-light.svg"} alt="bmlt api explorer logo" />
    </NavBrand>
    <div class="ml-auto flex items-center">
        <DarkMode size="lg" class="inline-block hover:text-gray-900 dark:hover:text-white" bind:isDark={isDarkMode} />
    </div>
    <ServerSelect />
</Navbar>
