<script lang="ts">
	import Icon from '../../icon.svelte';
	import App from '../+page.svelte';
	import type { Process } from '../../../models';
	export let process: Process;
</script>

<App on:close {process}>
	<div slot="icon"><Icon type="Globe" size="25" /></div>
	<span slot="app-name">Browser</span>

	<div slot="content" class="h-full">
		<iframe class="w-full h-full" title="browser" src="https://www.google.com/webhp?igu=1" />
	</div>
</App>
