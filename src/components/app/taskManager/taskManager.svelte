<script lang="ts">
	import {
		PresentationChartLine,
		ChartBar,
		Squares2x2,
		AdjustmentsHorizontal,
		Bars3
	} from 'svelte-heros';
	import App from '../app.svelte';
	import Processes from './processes/processes.svelte';
	import type { Process } from '../../../models';
	export let process: Process;

	let menuOpen = false;
	let open = 'processes';

	const toggleMenu = () => {
		menuOpen = !menuOpen;
	};

	let tabs = ['processes', 'performance', 'startup apps'];
</script>

<App on:close {process}>
	<div slot="icon"><PresentationChartLine /></div>
	<span slot="app-name">Task manager</span>

	<div slot="content" class="flex h-full">
		<div class="flex flex-col {menuOpen ? 'w-14' : 'w-60'} pl-4 gap-4 flex-wrap transition-all">
			<button class="flex gap-4" on:click={toggleMenu}><Bars3 /></button>
			<button class="flex gap-4"><Squares2x2 />Processes</button>
			<button class="flex gap-4"><ChartBar />Performance</button>
			<button class="flex gap-4"><AdjustmentsHorizontal />Startup apps</button>
		</div>
		<div class="flex-1 bg-slate-500">
			{#if open === 'processes'}
				<Processes />
			{/if}
		</div>
	</div>
</App>

<style>
	button:focus {
		border-left: 3px solid aqua;
	}
</style>
