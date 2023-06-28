<script lang="ts">
	import type { app } from '../../models';
	import Icon from '../icon.svelte';

	export let app: app;
	export let x = 0;
	export let y = 0;

	let width = 128;
	let height = 160;

	const drop = (event: DragEvent) => {
		x = Math.round((event.clientX - width / 2) / width);
		y = Math.round((event.clientY - height / 2) / height);
	};
</script>

<button
	class="absolute h-40 w-32 flex flex-col justify-center items-center rounded-md
        hover:bg-opacity-10 hover:bg-cyan-600 hover:break-words
        focus:bg-opacity-10 focus:bg-cyan-100"
	style="left:{x * width}px; top:{y * height}px;"
	on:dragend={drop}
	on:click
	draggable="true"
>
	<Icon type={app.icon} size="40" />
	<div class="w-full text-ellipsis overflow-hidden [text-shadow:_0_0_5px_rgb(0_0_0_/_100%)]">
		{app.name}
	</div>
</button>
