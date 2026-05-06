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
	style="width: 140px; height: 90px;"
	onclick={edit.handleClick}
	ondblclick={edit.startEdit}
>
	<svg width="140" height="90" viewBox="0 0 140 90" class="absolute inset-0">
		<!-- Body fill -->
		<rect x="8" y="16" width="124" height="58" style="fill: var(--color-node-fill)" />
		<!-- Bottom arc fill -->
		<ellipse cx="70" cy="74" rx="62" ry="13" style="fill: var(--color-node-fill)" />
		<!-- Top cap fill -->
		<ellipse cx="70" cy="16" rx="62" ry="13" style="fill: var(--color-node-cap)" />
		<!--
			Single compound path for all outlines — no junction overlap:
			Subpath 1: outer silhouette (left side up → top arc → right side down → front bottom arc)
			Subpath 2: inner rim of top cap (bottom arc of top ellipse)
		-->
		<path
			d="M 8,74 L 8,16 A 62,13 0 0,1 132,16 L 132,74 A 62,13 0 0,1 8,74 Z M 8,16 A 62,13 0 0,0 132,16"
			style="fill: none; stroke: {stroke}; stroke-width: {strokeWidth}"
		/>
	</svg>

	<div class="absolute inset-0 flex items-center justify-center px-4" style="padding-top: 22px;">
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

	<NodeHandles {selected} topStyle="top: 6px;" bottomStyle="bottom: 6px;" leftStyle="left: 2px;" rightStyle="right: 2px;" />
</div>
