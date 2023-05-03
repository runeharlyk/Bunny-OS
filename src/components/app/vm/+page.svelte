<script lang="ts">
	import App from '../+page.svelte';
	import Window from '../../window/+page.svelte';
	import type { Process } from '../../../models';
	import Icon from '../../icon.svelte';
	export let process: Process;
</script>

<App on:close {process}>
	<div slot="icon"><Icon type="Folder" /></div>
	<span slot="app-name">{process.name}</span>

	<div slot="content" class="flex h-full flex-col">
		<Window/>
	</div>
</App>
