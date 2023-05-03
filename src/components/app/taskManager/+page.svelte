<script lang="ts">
	import App from '../+page.svelte';
	import Processes from './processes/+page.svelte';
	import type { Process, tab } from '../../../models';
	import Performance from './performace/+page.svelte';
	import Icon from '../../icon.svelte';
	export let process: Process;

	let menuOpen = false;
	let open = 0;

	const toggleMenu = () => {
		menuOpen = !menuOpen;
	};

	let tabs: tab[] = [
		{
			name: 'processes',
			icon: 'Dashboard',
			component: Processes
		},
		{
			name: 'performance',
			icon: 'Chart',
			component: Performance
		},
		{
			name: 'processes',
			icon: 'Dashboard',
			component: Processes
		}
	];
</script>

<App on:close {process}>
	<div slot="icon"><Icon type="Chart" /></div>
	<span slot="app-name">{process.name}</span>

	<div slot="content" class="flex h-full">
		<div class="flex flex-col {menuOpen ? 'w-14' : 'w-60'} gap-4 flex-wrap transition-all">
			<button class="flex gap-4 pl-4 box-border" on:click={toggleMenu}>
				<Icon size="25" type="Hamburger" />
			</button>
			{#each tabs as tab, i}
				<button class="flex gap-4 pl-4 box-border capitalize" on:click={() => (open = i)}>
					<Icon type={tab.icon} size="25" />{tab.name}
				</button>
			{/each}
		</div>
		<div class="flex-1 bg-gray-800 rounded-tl-md rounded-br-md">
			<svelte:component this={tabs[open].component} process={process} />
		</div>
	</div>
</App>

<style>
	button:focus {
		border-left: 3px solid aqua;
		box-sizing: border-box;
	}
</style>
