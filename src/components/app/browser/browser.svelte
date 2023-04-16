<script lang="ts">
	import { GlobeAlt } from 'svelte-heros';
	import App from '../app.svelte';
	import type { Process } from '../../../models';
	export let process: Process;
</script>

<App on:close {process}>
	<div slot="icon"><GlobeAlt /></div>
	<span slot="app-name">Browser</span>

	<div slot="content" class="h-full">
		<iframe class="w-full h-full" title="browser" src="https://www.google.com/webhp?igu=1" />
	</div>
</App>
