<script>
    import { GlobeAlt } from "svelte-heros";
    import App from '../app.svelte';
</script>

<App on:close>
    <div slot="icon"><GlobeAlt/></div>
    <span slot="app-name">Browser</span>

    <div slot="content" class="h-full"><iframe class="w-full h-full" title="browser" src="https://www.google.com/webhp?igu=1"></iframe></div>
</App>