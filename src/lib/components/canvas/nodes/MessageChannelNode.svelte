<script lang="ts">
	import type { NodeProps, Node } from '@xyflow/svelte';
	import type { NodeMetadata } from '$lib/types';
	import { useNodeEdit } from './useNodeEdit.svelte';
	import NodeHandles from './NodeHandles.svelte';

	type NodeData = Node<{ metadata: NodeMetadata }>;
	let { id, data, selected = false }: NodeProps<NodeData> = $props();
	const edit = useNodeEdit(() => id, () => data);

	const stroke = $derived(selected ? 'var(--color-node-stroke-selected)' : 'var(--color-node-stroke)');
	const strokeWidth = $derived(selected ? 2.5 : 2);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="cursor-move select-none relative"
	style="width: 160px; height: 64px;"
	onclick={edit.handleClick}
	ondblclick={edit.startEdit}
>
	<svg width="160" height="64" viewBox="0 0 160 64" class="absolute inset-0" overflow="visible">
		<!-- Full body fill (outer silhouette, no seams) -->
		<path d="M 14,2 L 146,2 A 12,30 0 0,1 146,62 L 14,62 A 12,30 0 0,0 14,2 Z" style="fill: var(--color-node-fill)" />
		<!-- Left cap fill -->
		<ellipse cx="14" cy="32" rx="12" ry="30" style="fill: var(--color-node-cap)" />
		<!-- Left cap full border -->
		<ellipse cx="14" cy="32" rx="12" ry="30" style="fill: none; stroke: {stroke}; stroke-width: {strokeWidth}" />
		<!-- Top edge + right arc + bottom edge -->
		<path
			d="M 14,2 L 146,2 A 12,30 0 0,1 146,62 L 14,62"
			style="fill: none; stroke: {stroke}; stroke-width: {strokeWidth}"
		/>
	</svg>

	<div
		class="absolute inset-0 flex items-center justify-center"
		style="padding-left: 20px; padding-right: 12px;"
	>
		{#if edit.editing}
			<input
				bind:this={edit.inputEl}
				bind:value={edit.editValue}
				onblur={edit.commitEdit}
				onkeydown={edit.onInputKeyDown}
				class="w-full text-sm font-medium text-node-text text-center bg-node-fill border border-input-focus rounded px-1 outline-none"
			/>
		{:else}
			<p class="text-sm font-medium text-node-text text-center leading-tight">{data.metadata.name}</p>
		{/if}
	</div>

	<NodeHandles {selected} leftStyle="left: 4px;" rightStyle="right: 4px;" />
</div>
