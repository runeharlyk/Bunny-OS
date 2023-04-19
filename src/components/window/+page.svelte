<script lang="ts">
	import Tabbar from './tabbar.svelte';
	import TaskManager from '../app/taskManager/+page.svelte';
	import Browser from '../app/browser/+page.svelte';
	import { processes } from '../../store';
	import type { Process, ProcessType, Icon as IconType, app } from '../../models';
	import CameraApp from '../app/camera/+page.svelte';
	import FileExplore from '../app/fileExplore/+page.svelte';
	import Editor from '../app/editor/+page.svelte';
	import Calculator from '../app/calculator/+page.svelte';
	import Icon from '../icon.svelte';
	import type { ComponentType } from 'svelte';

	const openProgram = (type: ProcessType, component: ComponentType, icon: IconType) => {
		let process: Process = {
			id: Math.random() * 10000,
			component,
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

	let apps: app[] = [
		{
			name: 'Task Manager',
			icon: 'ChartLine',
			component: TaskManager
		},
		{
			name: 'Browser',
			icon: 'Globe',
			component: Browser
		},
		{
			name: 'Camera',
			icon: 'Camera',
			component: CameraApp
		},
		{
			name: 'File Explore',
			icon: 'Folder',
			component: FileExplore
		},
		{
			name: 'Editor',
			icon: 'Code',
			component: Editor
		},
		{
			name: 'Calculator',
			icon: 'Calculator',
			component: Calculator
		}
	];
</script>

<svelte:head>
	<title>Bunny OS</title>
	<meta name="description" content="Browser base OS" />
</svelte:head>

<main class="w-full h-full overflow-hidden bg-blue-950">
	{#each $processes as process}
		<svelte:component
			this={process.component}
			on:close={() => closeProgram(process.id)}
			{process}
		/>
	{/each}
	<div class="grid grid-cols-12 grid-rows-6 h-full">
		{#each apps as app}
			<button
				class="flex flex-col justify-center items-center hover:bg-slate-700"
				on:click={() => openProgram(app.name, app.component, app.icon)}
			>
				<Icon type={app.icon} size="40" />
				{app.name}
			</button>
		{/each}
	</div>
	<Tabbar />
</main>
