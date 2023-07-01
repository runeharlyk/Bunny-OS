<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { performanceTab } from '../../../../models';
	import Cpu from './cpu.svelte';
	import Memory from './memory.svelte';
	import Gpu from './gpu.svelte';

	let openIndex = 0;
	let interval: number;

	const open = (index: number) => {
		openIndex = index;
	};

	onMount(() => {
		setInterval(updateSummaries, 500);
	});

	onDestroy(() => {
		clearInterval(interval);
	});

	const updateSummaries = () => {
		if (performance.memory) {
			let usedMemory = Math.round((performance?.memory?.usedJSHeapSize / 1048576) * 10) / 10;
			let maxMemory = Math.round(performance?.memory?.jsHeapSizeLimit / 1048576);
			let memorySummery = `${usedMemory}/${maxMemory} MB (${Math.round(
				(usedMemory / maxMemory) * 100
			)}%)`;
			tabs[tabs.findIndex((x) => x.name === 'Memory')].summary = memorySummery;
		}
	};

	let tabs: performanceTab[] = [
		{
			name: 'CPU',
			icon: 'Chart',
			component: Cpu
		},
		{
			name: 'Memory',
			icon: 'Chart',
			component: Memory
		},
		{
			name: 'Disk',
			icon: 'Folder',
			component: Memory
		},
		{
			name: 'Wi-Fi',
			icon: 'Folder',
			component: Memory
		},
		{
			name: 'GPU',
			icon: 'Folder',
			component: Gpu
		}
	];
</script>

<div class="">
	<h2 class="p-4 border-b border-b-slate-400">Performance</h2>
	<div class="flex">
		<div class="flex flex-col w-64 p-1">
			{#each tabs as tab, i}
				<button class="h-14 pl-4 text-left hover:bg-gray-700 capitalize" on:click={() => open(i)}>
					<div class="text-lg">{tab.name}</div>
					<div class="text-sm">{tab.summary || ''}</div>
				</button>
			{/each}
		</div>
		<div class="flex-1 pl-8">
			<svelte:component this={tabs[openIndex].component} />
		</div>
	</div>
</div>
