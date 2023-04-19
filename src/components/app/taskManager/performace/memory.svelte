<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	let usedMemory = Math.round((performance?.memory?.usedJSHeapSize / 1048576) * 10) / 10;
	let maxMemory = Math.round(performance?.memory?.jsHeapSizeLimit / 1048576);
	let summary = `${usedMemory}/${maxMemory} MB (${Math.round((usedMemory / maxMemory) * 100)}%)`;

	let interval: number;

	onMount(() => {
		setInterval(update, 500);
	});

	onDestroy(() => {
		clearInterval(interval);
	});

	const update = () => {
		usedMemory = Math.round((performance?.memory?.usedJSHeapSize / 1048576) * 10) / 10;
		summary = `${usedMemory}/${maxMemory} MB (${Math.round((usedMemory / maxMemory) * 100)}%)`;
	};
</script>

<div class="flex justify-between items-center pr-4">
	<h1 class="text-left">Memory</h1>
	<div>{Math.round(performance.memory.jsHeapSizeLimit / 1048576)} MB</div>
</div>

<div>{usedMemory}mb</div>
<div>{maxMemory} mb</div>
<div>{summary}</div>
