<script lang="ts">
	import { GlobeAlt, PresentationChartLine, Camera } from "svelte-heros";
	import Tabbar from './tabbar.svelte';
	import TaskManager from '../app/taskManager/taskManager.svelte';
	import Browser from '../app/browser/browser.svelte';
	import { processes } from '../../store'
	import type { Process, ProcessType, Icon } from "../../models";
	import CameraApp from "../app/camera/camera.svelte";

	const openProgram = (type:ProcessType, icon:Icon) => {
		let process:Process = {id:(Math.random() * 10000), type, background:false, icon}
		processes.update(p => [...p, process])
	}

	const closeProgram = (id:number) => {
		processes.update(p => p.filter((x) => x.id !== id))
	}
</script>

<svelte:head>
	<title>Bunny OS</title>
	<meta name="description" content="Browser base OS" />
</svelte:head>

<main>
	{#each $processes as process, index}
		{#if process.type === "Task Manager"}
			<TaskManager on:close={() => closeProgram(process.id)}></TaskManager>
		{:else if process.type === "Browser"}
			<Browser on:close={() => closeProgram(process.id)}></Browser>
		{:else if process.type === "Camera"}
			<CameraApp on:close={() => closeProgram(process.id)}></CameraApp>
		{/if}
	{/each}
	<button on:click={() => openProgram("Task Manager", "ChartLine")}><PresentationChartLine size="30"/></button>
	
	<button on:click={() => openProgram("Browser", "Globe")}><GlobeAlt size="30"/></button>
	<button on:click={() => openProgram("Camera", "Camera")}><Camera size="30"/></button>
	
	<Tabbar></Tabbar>
</main>

<style>
	main {
		width: 100%;
        height: 100%;
		overflow: hidden;
		background-color: #0f172a;
	}
</style>
