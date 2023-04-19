<script lang="ts">
	import { onMount } from 'svelte';
	import Window from '../components/window/+page.svelte';

	onMount(async () => {
		await (navigator as any).wakeLock.request('screen');
	});
</script>

<svelte:head>
	<title>Bunny OS</title>
	<meta name="description" content="Browser base OS" />
</svelte:head>

<Window />
