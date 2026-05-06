<script lang="ts">
	import { exportPng, exportSvg } from '$lib/utils/export';

	interface Props {
		canvasRef: HTMLElement | null;
	}

	let { canvasRef }: Props = $props();

	let open = $state(false);

	async function handlePng() {
		if (!canvasRef) return;
		await exportPng(canvasRef, 'diagram');
		open = false;
	}

	function handleSvg() {
		if (!canvasRef) return;
		exportSvg(canvasRef, 'diagram');
		open = false;
	}
</script>

<div class="relative">
	<button
		onclick={() => (open = !open)}
		class="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-slate-700 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-slate-200"
	>
		↓ Export
	</button>

	{#if open}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="fixed inset-0 z-40" onclick={() => (open = false)}></div>
		<div class="absolute right-0 top-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50 overflow-hidden min-w-[120px]">
			<button
				onclick={handlePng}
				class="w-full text-left px-3 py-2 text-sm hover:bg-slate-700 transition-colors text-slate-200"
			>PNG</button>
			<button
				onclick={handleSvg}
				class="w-full text-left px-3 py-2 text-sm hover:bg-slate-700 transition-colors text-slate-200"
			>SVG</button>
		</div>
	{/if}
</div>
