<script lang="ts">
	import App from '../+page.svelte';
	import type { Process } from '../../../models';
	import Icon from '../../icon.svelte';
	import { Printer, ComputerDesktop } from 'svelte-heros';
	import { onMount } from 'svelte';
	import { humanFileSize } from '$lib/utils';
	export let process: Process;

	let historyIndex = 0;
	let history: FileSystemDirectoryHandle[] = [];

	let freeSpace = 0;
	let usedSpace = 0;
	let totalSpace = 0;
	let entries:Array<FileSystemDirectoryHandle> = [];
	let usbDevices: USBDevice[] = [];

	onMount(async () => {
		// Get access to specific directory
		//const dirHandle = await w.showDirectoryPicker();
		//entries = await dirHandle.entries();

		let storage = navigator.storage;
		let persistent = await storage.persist();
		let estimate = await storage.estimate();
		totalSpace = estimate.quota ?? 0
		usedSpace = estimate.usage ?? 0
		freeSpace = totalSpace - usedSpace

		if (!persistent) {
			console.log('Could not get persistent storage');
			return;
		}

		navigator.usb?.addEventListener('connect', (event: any) => {
			console.log(event);
		});

		navigator.usb?.addEventListener('disconnect', (event: any) => {
			console.log(event);
		});
		getUsbDevices();
	});

	const mount = async () => {
		const folder = await window.showDirectoryPicker();	
		await openFolder(folder, true);
	};

	const getUsbDevices = async () => {
		usbDevices = (await navigator.usb?.getDevices()) || [];
	};

	const addNewUsbDevices = async () => {
		await navigator.usb?.requestDevice({ filters: [] });
	};

	const historyBack = () => {
		historyIndex--;
		openFolder(history[historyIndex])
		//updateBrowserContext();
	};

	const historyForward = () => {
		historyIndex++;
		openFolder(history[historyIndex])
		//updateBrowserContext();
	};

	const openFolder = async (folder: FileSystemDirectoryHandle, addToHistory:boolean = false) => {
		if(addToHistory) {
			history.push(folder);
			historyIndex++
		}
		
		let tempEntries = [];
		for await (const [, value] of folder.entries()) {
			tempEntries.push(value);
		}
		
		tempEntries.sort((a, b) => a.constructor.name.localeCompare(b.constructor.name))
		
		entries = tempEntries;
	}
</script>

<App on:close {process}>
	<div slot="icon"><Icon type="Folder" /></div>
	<span slot="app-name">{process.name}</span>

	<div slot="content" class="flex h-full px-4 flex-col bg-gray-800">
		<div class="w-full">
			<div class="py-4 flex gap-4">
				<button
					on:click={historyBack}
					disabled={historyIndex === 0}
					class="round-full"
					class:text-gray-500={historyIndex === 0}>🡨</button
				>
				<button
					on:click={historyForward}
					disabled={historyIndex === history.length}
					class:text-gray-500={historyIndex === history.length}>🡪</button
				>
				<input class="w-3/4 bg-gray-800 border border-gray-600 p-1" placeholder=" > Bunny OS > data"/>
				<input class="w-1/4 bg-gray-800 border border-gray-600 p-1" placeholder=" Search"/>
			</div>
		</div>

		<div class="flex h-full">
			<ul class="flex flex-col w-1/4">
				<div>Devices</div>
				{#each usbDevices as device}
					<li class="flex gap-4">
						<Printer />
						<div class="w-full text-ellipsis overflow-hidden">{device.productName} - {device.manufacturerName}</div>
					</li>
				{/each}
			</ul>
			<div class="w-3/4 border-gray-600 border-l p-4">
				<button class="flex items-center gap-2 hover:bg-slate-600 p-3">
					<div><ComputerDesktop /></div>
					<div class="flex flex-col items-start">
						<div>Bunny storage</div>
						<div class="flex h-5 w-full bg-slate-500">
							<div class="bg-blue-500" style="width: {(usedSpace-freeSpace) / usedSpace*100}%;"></div>
							<div class=""></div>
						</div>
						<div>{humanFileSize(freeSpace, true)} free of {humanFileSize(totalSpace, true)}</div>
					</div>
				</button>
				<div>
					<button on:click={mount}> Open Files </button>
					{#each entries as entry}
						<button class="flex gap-4" on:dblclick={() => openFolder(entry, true)}>
							<Icon type="{entry.kind === "directory" ? "Folder" : "Code"}" />
							{entry.name}
						</button>
					{/each}
				</div>
				<div>
					<button on:click={addNewUsbDevices}>Add new Usb Device</button>
				</div>
			</div>
		</div>
	</div>
</App>
