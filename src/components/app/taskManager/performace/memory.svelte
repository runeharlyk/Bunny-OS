<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	let usedMemory = 0;
	let maxMemory = 0;
	let summary = '';
	let interval: number;

	onMount(() => {
		update();
		setInterval(update, 500);
	});

	onDestroy(() => {
		clearInterval(interval);
	});

	const update = () => {
		if (performance?.memory) {
			usedMemory = Math.round((performance?.memory?.usedJSHeapSize / 1048576) * 10) / 10;
			maxMemory = Math.round(performance?.memory?.jsHeapSizeLimit / 1048576);
			summary = `${usedMemory}/${maxMemory} MB (${Math.round((usedMemory / maxMemory) * 100)}%)`;
		}
	};
</script>

<div class="flex justify-between items-center pr-4">
	<h1 class="text-left">Memory</h1>
	<div>{maxMemory} MB</div>
</div>

<div>{usedMemory}mb</div>
<div>{maxMemory} mb</div>
<div>{summary}</div>
