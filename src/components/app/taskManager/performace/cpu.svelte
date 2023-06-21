<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	let portfolio: HTMLCanvasElement;
	let interval: number;

	let uptime: string;
	let cores: number;
	let speed: number;


	onMount(async () => {
		const Chart = await import('chart.js/auto');
		//const Worker = await import('../../../../lib/cpu-speed.worker?worker');
		cores = navigator.hardwareConcurrency;
		const ctx = portfolio.getContext('2d');

		update();
		setInterval(update, 1000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});

	const update = () => {
		const totalSeconds = Math.floor((document.timeline.currentTime || 0) / 1000);
		const seconds = String(totalSeconds % 60).padStart(2, '0');
		const minutes = String(Math.floor(totalSeconds / 60 / 60)).padStart(2, '0');
		const hours = String(Math.floor(totalSeconds / 60 / 60 / 60)).padStart(2, '0');
		uptime = `${hours}:${minutes}:${seconds}`;
	};
</script>

<div>
	<div class="flex justify-between items-center pr-4">
		<h1 class="text-left">CPU</h1>
		<div>Bunny CPU @ {Math.round(speed)}GHz</div>
	</div>
	<canvas bind:this={portfolio} class="w-1/6" />
	<div class="flex">
		<div class="w-48">
			<div class="flex flex-col">
				<div class="text-xs text-slate-500">Speed</div>
				<div>{speed} GHz</div>
			</div>
			<div class="flex flex-col">
				<div class="text-xs text-slate-500">Uptime</div>
				<div>{uptime}</div>
			</div>
		</div>
		<div class="grid grid-cols-2 text-xs w-56 [&>*:nth-child(odd)]:text-slate-500">
			<div>Base speed:</div>
			<div>{Math.round(speed)} GHz</div>
			<div>Sockets:</div>
			<div>1</div>
			<div>Cores:</div>
			<div>{cores / 2}</div>
			<div>Logical processors:</div>
			<div>{cores}</div>
		</div>
	</div>
</div>
