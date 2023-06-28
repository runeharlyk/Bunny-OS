<script lang="ts">
	import { processes, focusedProcess } from '../../store';
	import { SpeakerWave, Sun, ChatBubbleLeft } from 'svelte-heros';
	import Icon from '../icon.svelte';
	import { onDestroy, onMount } from 'svelte';
	
	export let instance_id:number
	
	onMount(() => {
		clock()
		clockTimer = setInterval(clock, 1000)
	})
	onDestroy(() => clearInterval(clockTimer))

	let clockTimer:number
	let time = "00:00" 
	let date = "01/01/0001"

	const clock = () => {
		const now = new Date();
		let h = now.getHours();
		let m = now.getMinutes();
		let hour = (h < 10) ? "0" + h : h;
		let minute = (m < 10) ? "0" + m : m;
		time = `${hour}:${minute}`

		date = now.toLocaleDateString(navigator.language);
	}
</script>

<div
	class="fixed bottom-0 left-0 z-50 w-full h-12 flex justify-space-between bg-gray-400 backdrop-filter backdrop-blur-2xl bg-opacity-10 text-sm"
>
	<div class="flex flex-none w-40 items-center">
		<button class="flex justify-center items-center hover:bg-neutral-700 h-full w-12">
			<Icon type="Dashboard" />
		</button>
	</div>
	<div class="flex flex-1 justify-center items-center">
		{#each $processes.filter((p) => !p.background && p.parent === instance_id) as process, index}
			<button
				on:click={() => (process.minimized = !process.minimized)}
				class="flex justify-center items-center hover:bg-neutral-700 h-full w-12 
				{$focusedProcess === process.type ? 'bg-neutral-700' : ''}"
				title={process.name}
			>
				<Icon type={process.icon} />
			</button>
		{/each}
	</div>
	<div class="flex flex-none w-40 items-center justify-end pr-4 gap-2">
		<SpeakerWave />
		<Sun />
		<div class="flex flex-col items-center">
			<div>{time}</div>
			<div>{date}</div>
		</div>
		<ChatBubbleLeft />
	</div>
</div>
