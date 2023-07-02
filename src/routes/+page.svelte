<script lang="ts">
	import { onMount } from 'svelte';
	import Window from '../components/window/+page.svelte';
	import { registerFetchIntercept } from '$lib/api';

	onMount(async () => {
		if ('WakeLock' in navigator) {
			await (navigator as any).wakeLock.request('screen');
		}
		registerFetchIntercept();
	});
</script>

<svelte:head>
	<title>Bunny OS</title>
	<meta name="description" content="Browser base OS" />
</svelte:head>

<Window />
