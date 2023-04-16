<script lang="ts">
    export let left_ab = 500
	export let top_ab = 500
    export let width = 500
	export let height = 500
    export let minimum_size = 20;
    export let debug:boolean = false;

    let resizing = false;

    let mouse_x = 0;
    let mouse_y = 0;
    let original_x = 0;
    let original_y = 0;
    let original_width = 0;
    let original_height = 0;
    let left:boolean, top:boolean, right:boolean, bottom:boolean = false;

    const startResize = (event:MouseEvent, l:boolean, t:boolean, r:boolean, b:boolean) => {
        original_width = width
        original_height = height
        mouse_x = event.pageX
        mouse_y = event.pageY
        let element = event.target as HTMLElement
        original_x = element.getBoundingClientRect().left;
        original_y = element.getBoundingClientRect().top;
        left = l
        top = t
        right = r
        bottom = b
        resizing = true
    }

    const resize = (event:MouseEvent) => {
        if(!resizing) return
        if(left) {
            width = Math.max(original_width - (event.pageX - mouse_x), minimum_size)
            left_ab = original_x + (event.pageX - mouse_x)
        }
        else if(right) width = Math.max(original_width + (event.pageX - mouse_x), minimum_size)
        if(top) {
            height = Math.max(original_height - (event.pageY - mouse_y), minimum_size)
            top_ab = original_y + (event.pageY - mouse_y)
        }
        else if(bottom) height = Math.max(original_height + (event.pageY - mouse_y), minimum_size)
    }
</script>

<div class="absolute -translate-x-1 -translate-y-1 flex flex-col" style="width:{width+8}px; height:{height+8}px;">
    <div class="flex h-2">
        <div class="w-2 cursor-nwse-resize border-red-700" class:border="{debug}" on:mousedown={(e) => startResize(e, true, true, false, false)}></div>
        <div class="flex-1 border-green-700 cursor-ns-resize" class:border="{debug}" on:mousedown={(e) => startResize(e, false, true, false, false)}></div>
        <div class="w-2 border-red-700 border cursor-nesw-resize" class:border="{debug}" on:mousedown={(e) => startResize(e, false, true, true, false)}></div>
    </div>
    <div class="flex-1 flex cursor-ew-resize">
        <div class="flex-1 border-blue-700" class:border="{debug}" data-l="1" on:mousedown={(e) => startResize(e, true, false, false, false)}></div>
        <div class="flex-1 border-blue-700" class:border="{debug}" data-r="1" on:mousedown={(e) => startResize(e, false, false, true, false)}></div>
    </div>
    <div class="flex h-2  cursor-ns-resize">
        <div class="h-2 w-2 border-red-700 cursor-nesw-resize" class:border="{debug}" on:mousedown={(e) => startResize(e, false, true, false, true)} data-l="1" data-b="1"></div>
        <div class="flex-1 border-green-700" class:border="{debug}" on:mousedown={(e) => startResize(e, false, false, false, true)}></div>
        <div class="h-2 w-2 border-red-700 cursor-nwse-resize" class:border="{debug}" on:mousedown={(e) => startResize(e, false, false, true, true)} data-r="1" data-b="1"></div>
    </div>
</div>

<svelte:window on:mouseup={() => resizing = false} on:mousemove={resize} />