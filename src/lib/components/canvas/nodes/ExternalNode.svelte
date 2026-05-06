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
	style="width: 160px; height: 90px;"
	onclick={edit.handleClick}
	ondblclick={edit.startEdit}
>
	<svg width="160" height="90" viewBox="0 0 160 90" class="absolute inset-0">
		<path
			d="M 30,75 Q 8,75 8,58 Q 8,42 24,40 Q 20,22 38,18 Q 48,4 66,14 Q 78,4 92,14 Q 108,4 118,20 Q 138,18 142,36 Q 156,40 154,56 Q 152,74 132,76 Z"
			style="fill: var(--color-node-fill); stroke: {stroke}; stroke-width: {strokeWidth}"
			stroke-linejoin="round"
		/>
	</svg>

	<div class="absolute inset-0 flex items-center justify-center px-6 pt-2">
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

	<NodeHandles {selected} topStyle="top: 12px;" bottomStyle="bottom: 12px;" leftStyle="left: 12px;" rightStyle="right: 12px;" />
</div>
