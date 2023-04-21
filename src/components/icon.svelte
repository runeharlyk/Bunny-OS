<script lang="ts">
	import {
		GlobeAlt,
		PresentationChartLine,
		Camera,
		Squares2x2,
		Folder,
		CodeBracket,
		Calculator,
		ChartBar,
		Bars3,
		ShieldExclamation
	} from 'svelte-heros';
	import type { Icon } from '../models';
	export let type: Icon = 'Globe';
	export let size = '20';
	let className: string = '';
	export { className as class };
</script>

<slot>
	{#if type === 'Globe'}
		<GlobeAlt {size} class={className} />
	{:else if type === 'Camera'}
		<Camera {size} class={className} />
	{:else if type === 'ChartLine'}
		<PresentationChartLine {size} class={className} />
	{:else if type === 'Dashboard'}
		<Squares2x2 {size} class={className} />
	{:else if type === 'Folder'}
		<Folder {size} class={className} />
	{:else if type === 'Code'}
		<CodeBracket {size} class={className} />
	{:else if type === 'Calculator'}
		<Calculator {size} class={className} />
	{:else if type === 'Chart'}
		<ChartBar {size} class={className} />
	{:else if type === 'Hamburger'}
		<Bars3 {size} class={className} />
	{:else if type === 'Shield-Exclamation'}
		<ShieldExclamation {size} class={className} />
	{:else}
		<Squares2x2 {size} class={className} color="red" />
	{/if}
</slot>
