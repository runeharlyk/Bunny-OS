<script lang="ts">
	import { focusedProcess, processes } from '../../store';
	import { XMark, Minus, Stop } from 'svelte-heros';
	import { createEventDispatcher, onMount } from 'svelte';
	import type { Process } from '../../models';
	import Resizer from './resizer.svelte';
	export let process: Process;
	export let left = 100;
	export let top = 100;
	export let width = 500;
	export let height = 500;

	let moving = false;
	let fullScreen = false;

	onMount(async () => {
		width = window.innerWidth / 2;
		height = window.innerHeight / 2;
		setWindowFocus();
	});

	const dispatch = createEventDispatcher();

	function minimize() {
		process.minimized = true;
	}
	function toggleMaximize() {
		process.minimized = false;
		fullScreen = !fullScreen;
	}

	function onMouseDown() {
		moving = true;
		setWindowFocus();
	}

	function onMouseMove(e: MouseEvent) {
		if (moving) {
			left += e.movementX;
			top += e.movementY;
		}
	}

	function onTouchMove(e: TouchEvent) {
		if (moving) {
			left = e.touches[0].clientX;
			top = e.touches[0].clientY;
		}
	}

	function onMouseUp() {
		moving = false;
	}

	const setWindowFocus = () => {
		$processes.filter((p) => p.id);

		focusedProcess.set(process.type);
	};

	function close() {
		dispatch('close');
	}
</script>

<div
	class="touch-none resize-none hover:resize w-1/3 h-1/3 absolute select-none transition-[transform,opacity] z-10"
	style="width:{fullScreen ? '100%' : `${width}px`}; 
		height:{fullScreen ? 'calc(100% - 48px)' : `${height}px`}; 
		left: {fullScreen ? 0 : left}px; 
		top: {fullScreen ? 0 : top}px; 
		transform: translate({process.minimized ? `calc(100% - ${left}px)` : '0'}, {process.minimized
		? `calc(80vw - ${top}px)`
		: '0'}); 
		opacity:{process.minimized ? 0 : 1}"
>
	<Resizer bind:width bind:height bind:top_ab={top} bind:left_ab={left} />
	<div
		class="flex flex-col bg-gray-400 backdrop-filter backdrop-blur-2xl bg-opacity-10 h-full
		{fullScreen ? '' : 'rounded-lg'}"
	>
		<div class="flex">
			<div
				class="flex gap-4 pl-4 py-4 flex-1 touch-none"
				on:mousedown={onMouseDown}
				on:touchstart={onMouseDown}
				on:touchmove={onTouchMove}
				on:touchend={onMouseUp}
				on:dblclick={toggleMaximize}
			>
				<div><slot name="icon" /></div>
				<div><slot name="app-name" /></div>
			</div>
			<div class="flex">
				<button
					class="w-14 grid justify-center items-center hover:bg-neutral-700"
					on:click={minimize}><Minus class="-translate-y-1" size="20" /></button
				>
				<button
					class="w-14 grid justify-center items-center hover:bg-neutral-700"
					on:click={toggleMaximize}><Stop size="20" /></button
				>
				<button class="w-14 grid justify-center items-center hover:bg-red-700" on:click={close}
					><XMark size="20" /></button
				>
			</div>
		</div>
		<div class="w-full flex-1 relative overflow-hidden" on:click={setWindowFocus} on:keypress={setWindowFocus}>
			<slot name="content"/>
		</div>
	</div>
</div>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />
