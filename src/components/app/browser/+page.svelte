<script lang="ts">
	import Icon from '../../icon.svelte';
	import App from '../+page.svelte';
	import type { Process } from '../../../models';
	import { arrayBufferToBase64Img } from '$lib/utils';
	export let process: Process;

	let inputUrl = (process.data as string) || 'google.com/webhp?igu=1';
	let historyIndex = 0;
	let history: string[] = [inputUrl];
	let reload = {};
	let couldLoad = true;
	let favicon = '';
	let shouldProxy = false;
	let proxy = 'https://proxy.runeharlyk.dk/';

	const search = (event: KeyboardEvent) => {
		if (event.key !== 'Enter' || !inputUrl) return;
		getFavIcon();
		history.push(inputUrl);
		historyIndex++;
	};

	const historyBack = () => {
		historyIndex--;
		updateBrowserContext();
	};

	const historyForward = () => {
		historyIndex++;
		updateBrowserContext();
	};

	const handleReload = () => {
		updateBrowserContext();
	};

	const updateBrowserContext = () => {
		couldLoad = true;
		inputUrl = history[historyIndex];
		reload = {};
		// TODO add CORS proxy for some/all tpc calls
		getFavIcon();
	};

	const handleErrors = () => {
		couldLoad = false;
		history.splice(historyIndex, 1);
		reload = {};
	};

	const getFavIcon = async () => {
		let hostname = new URL(`https://${inputUrl}`).hostname;
		const response = await fetch(`${proxy}https://${hostname}/favicon.ico`);
		if(!response.ok) {
			favicon = ""
			return;
		}
		
		const blob = await response.blob()
		var reader = new FileReader();
		reader.onload = () => {
			console.log(reader.result);
			
			favicon = reader.result as string
		};
		reader.readAsDataURL(blob);
	};
</script>

<App on:close {process}>
	<div slot="icon">
		{#if favicon}
		<img alt="Icon" src="{favicon}" height="25" width="25" />
		{:else}
		<Icon type="Globe" size="25" />
		{/if}
	</div>
	<span slot="app-name">{process.name}</span>

	<div slot="content" class="flex flex-col h-full bg-gray-800">
		<div class="flex h-8 m-1 pl-4">
			<div class="flex w-24 gap-4">
				<button
					on:click={historyBack}
					disabled={historyIndex === 0}
					class="round-full"
					class:text-gray-500={historyIndex === 0}>🡨</button
				>
				<button
					on:click={historyForward}
					disabled={historyIndex === history.length - 1}
					class:text-gray-500={historyIndex === history.length - 1}>🡪</button
				>
				<button on:click={handleReload}>⟳</button>
			</div>
			<div
				class="flex flex-1 bg-opacity-75 bg-gray-900 pl-2 rounded-full overflow-hidden items-center gap-2"
			>
				<div>{couldLoad ? "🔒" : "🛈"}</div>
				<input type="text" class="flex-1 bg-gray-900" bind:value={inputUrl} on:keydown={search} />
			</div>
		</div>
		<div
			class="h-8 flex pl-2 gap-2 items-start transition-all"
			class:h-0={couldLoad}
			class:hidden={couldLoad}
		>
			<Icon class="text-red-600" type="Shield-Exclamation" /> Could not load the page
		</div>
		{#key reload}
			<object
				class="w-full h-full"
				title="browser"
				name={`${Date.now()}`}
				data="{proxy}{history[historyIndex]}"
				on:error={handleErrors}
			/>
		{/key}
	</div>
</App>
