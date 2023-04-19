<script lang="ts">
	import App from '../+page.svelte';
	import type { Process } from '../../../models';
	import { onMount } from 'svelte';
	import Icon from '../../icon.svelte';

	export let process: Process;

	let video: HTMLVideoElement;

	onMount(async () => {
		let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
		video.srcObject = stream;
		video.play();
	});
</script>

<App on:close {process}>
	<div slot="icon"><Icon type="Camera" size="25" /></div>
	<span slot="app-name">Camera</span>
	<div slot="content" class="h-full flex">
		<div class="h-full flex-1 justify-center items-center">
			<!-- svelte-ignore a11y-media-has-caption -->
			<video bind:this={video} class="object-contain h-full">Video stream not available.</video>
		</div>
		<div class="flex justify-center items-center w-44 border-l-2 border-neutral-700">
			<button id="startbutton">Take photo</button>
		</div>
	</div>
</App>
