<script lang="ts">
	import App from '../+page.svelte';
	import type { Process } from '../../../models';
	import Icon from '../../icon.svelte';
	import { Printer } from 'svelte-heros';
	import { onMount } from 'svelte';
	export let process: Process;

	let freeSpace: string | undefined;
	let usedSpace: string | undefined;
	let w = window as any;
	let entries: string[] = [];
	let usbDevices: USBDevice[] = [];

	onMount(async () => {
		// Get access to specific directory
		//const dirHandle = await w.showDirectoryPicker();
		//entries = await dirHandle.entries();

		let storage = navigator.storage;
		let directoryHandle = await storage.getDirectory();
		let persistent = await storage.persist();
		let estimate = await storage.estimate();
		freeSpace = humanFileSize(estimate.quota ?? 0, true);
		usedSpace = humanFileSize(estimate.usage ?? 0, true);

		if (!persistent) {
			console.log('Could not get persistent storage');
			return;
		}
		console.log(storage);
		console.log(directoryHandle);

		navigator.usb?.addEventListener('connect', (event: any) => {
			console.log(event);
		});

		navigator.usb?.addEventListener('disconnect', (event: any) => {
			console.log(event);
		});
		getUsbDevices();
	});

	const humanFileSize = (bytes: number, si = false, dp = 1) => {
		const thresh = si ? 1000 : 1024;

		if (Math.abs(bytes) < thresh) {
			return bytes + ' B';
		}

		const units = si
			? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
			: ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
		let u = -1;
		const r = 10 ** dp;

		do {
			bytes /= thresh;
			++u;
		} while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

		return bytes.toFixed(dp) + ' ' + units[u];
	};

	const mount = async () => {
		const dirHandle = await w.showDirectoryPicker();
		let tempEntries = [];
		for await (const [key, value] of dirHandle.entries()) {
			tempEntries.push(key);
		}
		entries = tempEntries;
		console.log(entries);

		for await (const val of dirHandle.keys()) {
			console.log(val);
		}
	};

	const getUsbDevices = async () => {
		usbDevices = (await navigator.usb?.getDevices()) || [];
	};

	const addNewUsbDevices = async () => {
		await navigator.usb?.requestDevice({ filters: [] });
	};
</script>

<App on:close {process}>
	<div slot="icon"><Icon type="Folder" /></div>
	<span slot="app-name">{process.name}</span>

	<div slot="content" class="flex h-full px-4 flex-col">
		used space:{usedSpace}<br />
		free space:{freeSpace}<br />
		<div>
			<button on:click={mount}> Open Files </button>
			{#each entries as entry}
				<li class="flex gap-4">{entry}</li>
			{/each}
		</div>
		<div>
			<button on:click={addNewUsbDevices}>Add new Usb Device</button>
			{#each usbDevices as device}
				<li class="flex gap-4"><Printer />{device.productName} - {device.manufacturerName}</li>
			{/each}
		</div>
	</div>
</App>
