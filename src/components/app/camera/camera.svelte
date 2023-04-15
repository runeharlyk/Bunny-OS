<script>
    import { Camera } from "svelte-heros";
    import App from '../app.svelte';
</script>

<App on:close>
    <div slot="icon"><Camera/></div>
    <span slot="app-name">Camera</span>

    <div slot="content" class="h-full">
        camera

    </div>
</App>