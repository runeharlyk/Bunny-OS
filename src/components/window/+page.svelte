<script lang="ts">
	import Taskbar from './taskbar.svelte';
	import Background from './background.svelte';
	import TaskManager from '../app/taskManager/+page.svelte';
	import Browser from '../app/browser/+page.svelte';
	import { processes } from '../../stores';
	import type { Process, app } from '../../models';
	import CameraApp from '../app/camera/+page.svelte';
	import FileExplore from '../app/fileExplore/+page.svelte';
	import Editor from '../app/editor/+page.svelte';
	import Calculator from '../app/calculator/+page.svelte';
	import WM from '../app/vm/+page.svelte'
	import AppIconButton from './appIconButton.svelte';
	import { arrayBufferToBase64Img } from '$lib/utils';
	import type { FileModel } from '../../db';

	export let instance_id:number = Math.random() * 10000;
	let files: app[] = [];

	const openProgram = (app: app) => {
		let process: Process = {
			id: Math.random() * 10000,
			name: app.name,
			parent:instance_id,
			component: app.component,
			type: app.type,
			background: false,
			icon: app.icon,
			minimized: false,
			data: app.data
		};
		processes.update((p) => [...p, process]);
	};

	const closeProgram = (id: number) => {
		processes.update((p) => p.filter((x) => x.id !== id));
	};

	let apps: app[] = [
		{
			name: 'Task Manager',
			type: 'Task Manager',
			icon: 'ChartLine',
			component: TaskManager
		},
		{
			name: 'Browser',
			type: 'Browser',
			icon: 'Globe',
			component: Browser
		},
		{
			name: 'Camera',
			type: 'Camera',
			icon: 'Camera',
			component: CameraApp
		},
		{
			name: 'File Explore',
			type: 'File Explore',
			icon: 'Folder',
			component: FileExplore
		},
		{
			name: 'Editor',
			type: 'Editor',
			icon: 'Code',
			component: Editor
		},
		{
			name: 'Calculator',
			type: 'Calculator',
			icon: 'Calculator',
			component: Calculator
		},
		{
			name: 'Runeharlyk.dk',
			type: 'Browser',
			icon: 'Globe',
			component: Browser,
			data: 'runeharlyk.dk'
		},
		{
			name: 'Bunny OS',
			type: 'Browser',
			icon: 'Globe',
			component: WM
		}
	];

	const dropHandler = async (ev: DragEvent) => {
		ev.preventDefault();
		ev.stopPropagation();
		let file: FileModel = { name: '', path: '/', size: 0 };
		const fileReader = new FileReader();
		fileReader.onload = () => {
			const srcData = fileReader.result;
			file.content = srcData as ArrayBuffer;
			let fileShortcut: app = {
				name: file.name,
				type: 'File Explore',
				icon: arrayBufferToBase64Img(file.content),
				component: Browser,
				data: file
			};
			files = [...files, fileShortcut];
		};

		if (ev.dataTransfer?.items.length) {
			let firstFile = ev.dataTransfer?.items[0].getAsFile();
			if (firstFile) {
				file.name = firstFile.name;
				file.mime = firstFile.type;
				file.size = firstFile.size;
				let stream = firstFile?.stream();
				let reader = stream?.getReader();
				let filecontent = await reader?.read();
				if (filecontent?.value) {
					fileReader.readAsArrayBuffer(new Blob([filecontent?.value]));
				}
			}

			// Use DataTransferItemList interface to access the file(s)
			[...ev.dataTransfer.items].forEach((item, i) => {
				// If dropped items aren't files, reject them
				if (item.kind === 'file') {
					const file = item.getAsFile();
					console.log(`items: file[${i}].name = ${file?.name}`);
				}
			});
		} else {
			// Use DataTransfer interface to access the file(s)
			[...ev.dataTransfer!.files].forEach((file, i) => {
				console.log(`files: file[${i}].name = ${file.name}`);
			});
		}
	};

	function dragOverHandler(ev: DragEvent) {
		ev.preventDefault();
	}
</script>

<svelte:head>
	<title>Bunny OS</title>
	<meta name="description" content="Browser base OS" />
</svelte:head>

<main class="w-full h-full overflow-hidden">
	{#each $processes.filter(x => x.parent === instance_id) as process}
		<svelte:component
			this={process.component}
			on:close={() => closeProgram(process.id)}
			{process}
		/>
	{/each}
	<div class="h-full relative" on:drop={dropHandler} on:dragover={dragOverHandler}>
		{#each apps as app, x}
			<AppIconButton {app} {x} on:click={() => openProgram(app)} />
		{/each}
		{#each files as file, x}
			<AppIconButton app={file} {x} y={1} on:click={() => openProgram(file)} />
		{/each}
	</div>
	<Taskbar instance_id={instance_id} />
	<Background />
</main>
