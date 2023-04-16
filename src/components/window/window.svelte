<script lang="ts">
	import { GlobeAlt, PresentationChartLine, Camera, Folder } from 'svelte-heros';
	import Tabbar from './tabbar.svelte';
	import TaskManager from '../app/taskManager/taskManager.svelte';
	import Browser from '../app/browser/browser.svelte';
	import { processes } from '../../store';
	import type { Process, ProcessType, Icon } from '../../models';
	import CameraApp from '../app/camera/camera.svelte';
	import FileExplore from '../app/fileExplore/fileExplore.svelte';

	const openProgram = (type: ProcessType, icon: Icon) => {
		let process: Process = {
			id: Math.random() * 10000,
			type,
			background: false,
			icon,
			minimized: false
		};
		processes.update((p) => [...p, process]);
	};

	const closeProgram = (id: number) => {
		processes.update((p) => p.filter((x) => x.id !== id));
	};
</script>

<svelte:head>
	<title>Bunny OS</title>
	<meta name="description" content="Browser base OS" />
</svelte:head>

<main>
	{#each $processes as process}
		{#if process.type === 'Task Manager'}
			<TaskManager on:close={() => closeProgram(process.id)} {process} />
		{:else if process.type === 'Browser'}
			<Browser on:close={() => closeProgram(process.id)} {process} />
		{:else if process.type === 'Camera'}
			<CameraApp on:close={() => closeProgram(process.id)} {process} />
		{:else if process.type === 'File Explore'}
			<FileExplore on:close={() => closeProgram(process.id)} {process} />
		{/if}
	{/each}
	<div class="grid grid-cols-12 grid-rows-6 h-full">
		<button
			class="flex flex-col justify-center items-center hover:bg-slate-700"
			on:click={() => openProgram('Task Manager', 'ChartLine')}
		>
			<PresentationChartLine size="40" />
			Task Manager
		</button>
		<button
			class="flex flex-col justify-center items-center hover:bg-slate-700"
			on:click={() => openProgram('Browser', 'Globe')}
		>
			<GlobeAlt size="40" />
			Browser
		</button>
		<button
			class="flex flex-col justify-center items-center hover:bg-slate-700"
			on:click={() => openProgram('Camera', 'Camera')}
		>
			<Camera size="40" />
			Camera
		</button>
		<button
			class="flex flex-col justify-center items-center hover:bg-slate-700"
			on:click={() => openProgram('File Explore', 'Folder')}
		>
			<Folder size="40" />
			File Explore
		</button>
	</div>

	<Tabbar />
</main>

<style>
	main {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: #0f172a;
	}
</style>
