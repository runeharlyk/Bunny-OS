<script lang="ts">
	import { humanFileSize } from "$lib/utils";
	import { Ipv4, SendSize, ReceivedSize } from "../../../../stores";
	let portfolio: HTMLCanvasElement;

</script>

<div>
	<div class="flex justify-between items-center pr-4">
		<h1 class="text-left">Network</h1>
		<div>Ethernet Connection</div>
	</div>
	<canvas bind:this={portfolio} class="w-1/6" />
	<div class="flex">
		<div class="w-48">
			<div class="flex flex-col">
				<div class="text-xs text-slate-500">Send</div>
				<div>{humanFileSize($SendSize)}</div>
			</div>
			<div class="flex flex-col">
				<div class="text-xs text-slate-500">Receive</div>
				<div>{humanFileSize($ReceivedSize)}</div>
			</div>
		</div>
		<div class="grid grid-cols-2 text-xs w-56 [&>*:nth-child(odd)]:text-slate-500">
			<div>Adapter name:</div>
			<div>Ethernet</div>
			<div>DNS name:</div>
			<div>home</div>
			<div>Connection type</div>
			<div>4g</div>
			<div>IPv4 address:</div>
			<div>{$Ipv4}</div>
		</div>
	</div>
</div>
