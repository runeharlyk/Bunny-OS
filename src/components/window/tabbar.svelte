<script>
	import { processes, focusedProcess } from '../../store';
	import { SpeakerWave, Sun, ChatBubbleLeft } from 'svelte-heros';
	import Icon from '../icon.svelte';
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
		{#each $processes.filter((p) => !p.background) as process, index}
			<button
				on:click={() => (process.minimized = !process.minimized)}
				class="flex justify-center items-center hover:bg-neutral-700 h-full w-12 {$focusedProcess ===
				process.type
					? 'bg-neutral-700'
					: ''}"
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
			<div>16:58</div>
			<div>15/04/2023</div>
		</div>
		<ChatBubbleLeft />
	</div>
</div>
