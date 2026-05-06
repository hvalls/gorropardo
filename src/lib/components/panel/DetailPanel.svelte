<script lang="ts">
	import NodePanel from './NodePanel.svelte';
	import EdgePanel from './EdgePanel.svelte';
	import { selection } from '$lib/stores/selection';
	import { diagram } from '$lib/stores/diagram';

	let isSingleNode = $derived(
		$selection?.nodeIds.length === 1 && $selection.edgeIds.length === 0
	);
	let isSingleEdge = $derived(
		$selection?.edgeIds.length === 1 && $selection.nodeIds.length === 0
	);
	let totalSelected = $derived(
		($selection?.nodeIds.length ?? 0) + ($selection?.edgeIds.length ?? 0)
	);

	let selectedNode = $derived(
		isSingleNode ? $diagram.nodes.find((n) => n.id === $selection!.nodeIds[0]) : null
	);
	let selectedEdge = $derived(
		isSingleEdge ? $diagram.edges.find((e) => e.id === $selection!.edgeIds[0]) : null
	);
</script>

<div
	class="absolute top-0 left-0 h-full w-72 bg-panel-bg border-r border-panel-border flex flex-col shadow-lg z-10 transition-transform duration-200 ease-out"
	class:-translate-x-full={!$selection || totalSelected > 1}
>
	{#if $selection && totalSelected === 1}
		<div class="px-4 py-3 border-b border-panel-border flex items-center justify-between">
			<h2 class="text-sm font-semibold text-panel-heading">
				{isSingleNode ? 'Component' : 'Connection'}
			</h2>
			<button
				onclick={() => selection.set(null)}
				class="text-panel-muted hover:text-panel-text-dim text-lg leading-none"
				aria-label="Close"
			>×</button>
		</div>

		<div class="flex-1 overflow-y-auto px-4 py-4">
			{#if selectedNode}
				<NodePanel node={selectedNode} />
			{:else if selectedEdge}
				<EdgePanel edge={selectedEdge} />
			{/if}
		</div>
	{/if}
</div>
