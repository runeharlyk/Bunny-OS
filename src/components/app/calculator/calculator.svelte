<script lang="ts">
	import App from '../app.svelte';
	import type { Process } from '../../../models';
	import Icon from '../../icon.svelte';
	import {
		append,
		backspace,
		calculate,
		clear,
		format,
		history,
		interpolation,
		percentage,
		type operator
	} from './operators';
	export let process: Process;

	let operators: operator[] = [
		{ key: '%', action: percentage, triggers: ['%'] },
		{ key: 'CE', action: clear, triggers: ['Delete'] },
		{ key: 'C', action: clear, triggers: ['Delete'] },
		{ key: 'back', action: backspace, triggers: ['Backspace'] },
		{ key: '1/x', action: interpolation },
		{ key: 'x^2', action: interpolation },
		{ key: '2sqrt(x)', action: interpolation },
		{ key: '/', action: append },
		{ key: '7', action: append },
		{ key: '8', action: append },
		{ key: '9', action: append },
		{ key: '*', action: append },
		{ key: '4', action: append },
		{ key: '5', action: append },
		{ key: '6', action: append },
		{ key: '-', action: append },
		{ key: '1', action: append },
		{ key: '2', action: append },
		{ key: '3', action: append },
		{ key: '+', action: append },
		{ key: '+/-', action: append },
		{ key: '0', action: append },
		{ key: ',', action: append },
		{ key: '=', action: calculate, triggers: ['Enter'] }
	];
	let calculation = '';

	const handleKeyPress = (event: KeyboardEvent) => {
		let op = operators.filter((x) => x.key === event.key || x?.triggers?.includes(event.key))[0];
		if (op) {
			calculation = op?.action(op.key, calculation);
		}
	};
</script>

<App on:close {process}>
	<div slot="icon"><Icon type="Calculator" /></div>
	<span slot="app-name">Calculater</span>

	<div slot="content" class="flex h-full px-4 flex-col bg-gradient-to-t from-slate-800">
		<div class="h-1/4 text-right">
			<div class="text-2xl h-9 text-slate-500">
				{history[history.length - 1]?.operation ?? ''}
			</div>
			<div class="text-6xl">
				{calculation}
			</div>
		</div>
		<div class="h-3/4 grid grid-cols-4 gap-1 pb-4 text-xl">
			{#each operators as operator, i}
				<button
					on:click={() => (calculation = operator.action(operator.key, calculation))}
					class={i !== operators.length - 1 ? 'bg-slate-700' : 'bg-blue-500'}
				>
					{format(operator.key)}
				</button>
			{/each}
		</div>
	</div>
</App>

<svelte:window on:keydown={handleKeyPress} />
