<script lang="ts">
	import { processes, focusedProcess, time } from '../../stores';
	import { SpeakerWave, Sun, ChatBubbleLeft } from 'svelte-heros';
	import Icon from '../icon.svelte';
	
	export let instance_id:number

	const timeFormatter = new Intl.DateTimeFormat(Intl.DateTimeFormat().resolvedOptions().locale, {
		hour: 'numeric',
  		minute: 'numeric',
	});

	const dateFormatter = new Intl.DateTimeFormat(Intl.DateTimeFormat().resolvedOptions().locale, {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	});

</script>

<div
	class="fixed bottom-0 left-0 z-50 w-full h-12 flex justify-space-between bg-slate-700 backdrop-filter backdrop-blur-3xl bg-opacity-10 text-sm"
>
	<div class="flex flex-none w-40 items-center">
		<button class="flex justify-center items-center hover:bg-neutral-700 h-full w-12">
			<Icon type="Dashboard" />
		</button>
	</div>
	<div class="flex flex-1 justify-center items-center">
		{#each $processes.filter((p) => !p.background && p.parent === instance_id) as process}
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
			<div>{timeFormatter.format($time)}</div>
			<div>{dateFormatter.format($time)}</div>
		</div>
		<ChatBubbleLeft />
	</div>
</div>
