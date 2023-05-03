<script lang="ts">
	import App from '../+page.svelte';
	import type { Process } from '../../../models';
	import Icon from '../../icon.svelte';
	export let process: Process;

	import type monaco from 'monaco-editor';
	import { onMount } from 'svelte';
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
	import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
	import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
	import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

	let divEl: HTMLDivElement | null = null;
	let editor: monaco.editor.IStandaloneCodeEditor;
	let Monaco;

	onMount(async () => {
		// @ts-ignore
		self.MonacoEnvironment = {
			getWorker: function (_moduleId: any, label: string) {
				if (label === 'json') {
					return new jsonWorker();
				}
				if (label === 'css' || label === 'scss' || label === 'less') {
					return new cssWorker();
				}
				if (label === 'html' || label === 'handlebars' || label === 'razor') {
					return new htmlWorker();
				}
				if (label === 'typescript' || label === 'javascript') {
					return new tsWorker();
				}
				return new editorWorker();
			}
		};

		Monaco = await import('monaco-editor');
		editor = Monaco.editor.create(divEl!, {
			value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
			language: 'javascript',
			theme: 'vs-dark'
		});

		return () => {
			editor.dispose();
		};
	});
</script>

<App on:close {process}>
	<div slot="icon"><Icon type="Folder" /></div>
	<span slot="app-name">{process.name}</span>

	<div slot="content" class="flex h-full flex-col overflow-hidden" bind:this={divEl} />
</App>
