<script lang="ts">
	import { processes } from '../../../../store';
	import Icon from '../../../icon.svelte';
</script>

<div class="p-4">
	<h2 class="mb-4">Apps({$processes.length})</h2>
	<ul>
		{#each $processes.filter((p) => !p.background) as process, index}
			<li class="flex gap-4"><Icon type={process.icon} />{process.type}</li>
		{/each}
	</ul>

	<h2 class="mt-8 mb-4">Background processes({$processes.filter((p) => p.background).length})</h2>
	<ul>
		{#each $processes.filter((p) => p.background) as process, index}
			<li class="flex gap-4"><Icon type={process.icon} />{process.type}</li>
		{/each}
	</ul>
</div>
