<script lang="ts">
	import { diagram } from '$lib/stores/diagram';
	import type { Diagram } from '$lib/types';

	let fileInput: HTMLInputElement;
	let pending: Diagram | null = $state(null);
	let error: string | null = $state(null);

	function handleClick() {
		fileInput.click();
	}

	function handleFileChange(e: Event) {
		const file = (e.target as HTMLInputElement).files?.[0];
		if (!file) return;
		(e.target as HTMLInputElement).value = '';

		const reader = new FileReader();
		reader.onload = (ev) => {
			try {
				const parsed = JSON.parse(ev.target?.result as string);
				if (!Array.isArray(parsed?.nodes) || !Array.isArray(parsed?.edges)) {
					error = 'Invalid diagram file.';
					return;
				}
				const isEmpty = $diagram.nodes.length === 0 && $diagram.edges.length === 0;
				if (isEmpty) {
					diagram.set(parsed as Diagram);
				} else {
					pending = parsed as Diagram;
				}
			} catch {
				error = 'Could not parse the file. Make sure it is a valid diagram file.';
			}
		};
		reader.readAsText(file);
	}

	function confirmOpen() {
		if (pending) diagram.set(pending);
		pending = null;
	}

	function cancel() {
		pending = null;
		error = null;
	}
</script>

<input bind:this={fileInput} type="file" accept=".gorropardo" class="hidden" onchange={handleFileChange} />

<button
	onclick={handleClick}
	title="Open"
	class="flex items-center justify-center p-2 border border-slate-700 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-slate-200"
>
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
		<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
	</svg>
</button>

{#if pending}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
		<div class="bg-slate-800 border border-slate-700 rounded-lg p-5 max-w-sm w-full mx-4 shadow-xl">
			<p class="text-slate-200 text-sm mb-1 font-medium">Replace current diagram?</p>
			<p class="text-slate-400 text-sm mb-5">Your current diagram will be permanently lost. This cannot be undone.</p>
			<div class="flex justify-end gap-2">
				<button
					onclick={cancel}
					class="px-3 py-1.5 text-sm rounded border border-slate-600 text-slate-300 hover:bg-slate-700 transition-colors"
				>Cancel</button>
				<button
					onclick={confirmOpen}
					class="px-3 py-1.5 text-sm rounded bg-red-600 hover:bg-red-500 text-white transition-colors"
				>Replace diagram</button>
			</div>
		</div>
	</div>
{/if}

{#if error}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
		<div class="bg-slate-800 border border-slate-700 rounded-lg p-5 max-w-sm w-full mx-4 shadow-xl">
			<p class="text-slate-200 text-sm mb-4">{error}</p>
			<div class="flex justify-end">
				<button
					onclick={cancel}
					class="px-3 py-1.5 text-sm rounded border border-slate-600 text-slate-300 hover:bg-slate-700 transition-colors"
				>Close</button>
			</div>
		</div>
	</div>
{/if}
