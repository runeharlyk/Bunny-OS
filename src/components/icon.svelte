<script lang="ts">
	import { GlobeAlt, PresentationChartLine, Camera, Squares2x2, Folder, CodeBracket } from 'svelte-heros';
	import type { Icon } from '../models';
	export let type: Icon = 'Globe';
</script>

<slot>
	{#if type === 'Globe'}
		<GlobeAlt size="20" />
	{:else if type === 'Camera'}
		<Camera size="20" />
	{:else if type === 'ChartLine'}
		<PresentationChartLine size="20" />
	{:else if type === 'Dashboard'}
		<Squares2x2 size="20" />
	{:else if type === 'Folder'}
		<Folder size="20" />
	{:else if type === 'Code'}
		<CodeBracket size="20" />
	{:else}
		<Squares2x2 size="20" color="red" />
	{/if}
</slot>
