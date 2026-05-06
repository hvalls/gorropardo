<script lang="ts">
	import { exportPng } from '$lib/utils/export';

	interface Props {
		canvasRef: HTMLElement | null;
	}

	let { canvasRef }: Props = $props();

	async function handleExportImage() {
		if (!canvasRef) return;
		await exportPng(canvasRef, 'diagram');
	}
</script>

<button
	onclick={handleExportImage}
	title="Export as image"
	class="flex items-center justify-center p-2 border border-slate-700 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-slate-200"
>
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
		<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
		<circle cx="8.5" cy="8.5" r="1.5"/>
		<polyline points="21 15 16 10 5 21"/>
	</svg>
</button>
