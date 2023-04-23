<script lang="ts">
	import { onMount } from 'svelte';

	let gpu: string;

	onMount(() => {
		const gl = document.createElement('canvas').getContext('webgl')!;
		const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')!;
		gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
		gpu = gpu
			.replace(/.*ANGLE ?\((.+)\)(?: on vulkan [0-9.]+)?$/i, '$1')
			.replace(/\s(\d{1,2}gb|Direct3D.+$)|\(r\)| \([^)]+\)$/g, '')
			.replace(/(?:Vulkan|OpenGL) \d+\.\d+(?:\.\d+)?(?: \((.*)\))?/, '$1');
		gpu = gpu.substring(gpu.indexOf(',') + 1, gpu.length);
	});
</script>

<div class="flex justify-between items-center pr-4">
	<h1 class="text-left">GPU</h1>
	<div>{gpu}</div>
</div>
