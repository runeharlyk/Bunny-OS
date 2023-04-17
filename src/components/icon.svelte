<script lang="ts">
	import {
		GlobeAlt,
		PresentationChartLine,
		Camera,
		Squares2x2,
		Folder,
		CodeBracket,
		Calculator
	} from 'svelte-heros';
	import type { Icon } from '../models';
	export let type: Icon = 'Globe';
	export let size = '20';
</script>

<slot>
	{#if type === 'Globe'}
		<GlobeAlt {size} />
	{:else if type === 'Camera'}
		<Camera {size} />
	{:else if type === 'ChartLine'}
		<PresentationChartLine {size} />
	{:else if type === 'Dashboard'}
		<Squares2x2 {size} />
	{:else if type === 'Folder'}
		<Folder {size} />
	{:else if type === 'Code'}
		<CodeBracket {size} />
	{:else if type === 'Calculator'}
		<Calculator {size} />
	{:else}
		<Squares2x2 {size} color="red" />
	{/if}
</slot>
