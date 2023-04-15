<script lang="ts">
    import { XMark, Minus, Stop } from "svelte-heros";
    import { createEventDispatcher, onMount } from 'svelte'
    export let left = 100
	export let top = 100
    export let width = 500
	export let height = 500
    
	onMount(async () => {
		width = window.screen.availWidth/2
		height = window.screen.availHeight/2
	});

    const dispatch = createEventDispatcher()

    let moving = false
    let minimized = false
    let fullScreen = false

    function minimize(){ minimized = true }
    function toggleMaximize(){ 
        minimized = false 
        fullScreen = !fullScreen
    }

    function onMouseDown() {
		moving = true
	}
	
	function onMouseMove(e:MouseEvent) {
        if (moving) {
            console.log(e);
			left += e.movementX
			top += e.movementY
		}
	}

    function onTouchMove(e:TouchEvent){
        if (moving) {
			left = e.touches[0].clientX
			top = e.touches[0].clientY
		}
    }
	
	function onMouseUp() {
		moving = false
	}

    function close() {
        dispatch('close')
    }
</script>

<div class="touch-none resize-none hover:resize w-1/3 h-1/3 absolute select-none transition-[transform,opacity]" 
    style="width:{fullScreen?window.screen.availWidth:width}px; height:{fullScreen?window.screen.availHeight:height}px; left: {fullScreen?0:left}px; top: {fullScreen?0:top}px; transform: translate({minimized?`calc(100% - ${left}px)`:"0"}, {minimized?`calc(80vw - ${top}px)`:"0"}); opacity:{minimized?0:1}">
    <div class="flex flex-col bg-gray-400 backdrop-filter backdrop-blur-2xl bg-opacity-10 h-full {fullScreen ? '':'rounded-lg'}">
    <div class="flex">
        <div class="flex gap-4 pl-4 py-4 flex-1 touch-none" on:mousedown={onMouseDown} on:touchstart={onMouseDown} on:touchmove={onTouchMove} on:touchend={onMouseUp}>
            <div><slot name="icon"/></div>
            <div><slot name="app-name"/></div>
        </div>
        <div class="flex">
            <button class="w-14 grid justify-center items-center hover:bg-neutral-700" on:click={minimize}><Minus class="-translate-y-1" size="20"/></button>
            <button class="w-14 grid justify-center items-center hover:bg-neutral-700" on:click={toggleMaximize}><Stop size="20"/></button>
            <button class="w-14 grid justify-center items-center hover:bg-red-700" on:click={close}><XMark size="20"/></button>
        </div>
    </div>
    <div class="w-full h-full">
        <slot name="content"/>
    </div>
</div>
</div>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />
