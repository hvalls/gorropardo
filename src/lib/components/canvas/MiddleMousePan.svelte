<script lang="ts">
	import { useSvelteFlow } from '@xyflow/svelte';

	const { getViewport, setViewport } = useSvelteFlow();

	let isPanning = false;
	let lastX = 0;
	let lastY = 0;

	function onMouseDown(e: MouseEvent) {
		if (e.button === 1) {
			e.preventDefault();
			isPanning = true;
			lastX = e.clientX;
			lastY = e.clientY;
		}
	}

	function onMouseMove(e: MouseEvent) {
		if (!isPanning) return;
		const dx = e.clientX - lastX;
		const dy = e.clientY - lastY;
		lastX = e.clientX;
		lastY = e.clientY;
		const { x, y, zoom } = getViewport();
		setViewport({ x: x + dx, y: y + dy, zoom });
	}

	function onMouseUp(e: MouseEvent) {
		if (e.button === 1) isPanning = false;
	}
</script>

<svelte:window onmousedown={onMouseDown} onmousemove={onMouseMove} onmouseup={onMouseUp} />
