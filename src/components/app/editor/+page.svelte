<script lang="ts">
	import { onMount } from 'svelte';
	import App from '../+page.svelte';
	import type { Process } from '../../../models';
	import Icon from '../../icon.svelte';
	export let process: Process;

	let divEl: HTMLDivElement | null = null;

	onMount(async() => {
		const monaco = await import('monaco-editor');
		if(divEl === null) return
		monaco.editor.create(divEl, {
			value: 'console.log("Hello, world")',
			language: 'javascript',
			theme: 'vs-dark'
		});
	})
</script>

<App on:close {process}>
	<div slot="icon"><Icon type="Folder" /></div>
	<span slot="app-name">{process.name}</span>

	<div slot="content" class="flex h-full flex-col overflow-hidden" bind:this={divEl} />
</App>
