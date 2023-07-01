<script lang="ts">
	import type { Process } from '../../../../models';
	import { processes } from '../../../../stores';
	import Icon from '../../../icon.svelte';

	export let process: Process

	$: apps = $processes.filter((p) => !p.background && p.parent == process.parent)
	$: backgroundApps = $processes.filter((p) => p.background && p.parent == process.parent)
</script>

<div class="p-4">
	<h2 class="mb-4">Apps({apps.length})</h2>
	<ul>
		{#each apps as app}
			<li class="flex gap-4"><Icon type={app.icon} />{app.type}</li>
		{/each}
	</ul>

	<h2 class="mt-8 mb-4">Background processes({backgroundApps.length})</h2>
	<ul>
		{#each backgroundApps as process}
			<li class="flex gap-4"><Icon type={process.icon} />{process.type}</li>
		{/each}
	</ul>
</div>
