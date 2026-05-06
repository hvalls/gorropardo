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
	style="width: 140px; height: 80px;"
	onclick={edit.handleClick}
	ondblclick={edit.startEdit}
>
	<svg width="140" height="80" viewBox="0 0 140 80" class="absolute inset-0" overflow="visible">
		<polygon
			points="35,0 105,0 140,40 105,80 35,80 0,40"
			style="fill: var(--color-node-fill); stroke: {stroke}; stroke-width: {strokeWidth}"
			stroke-linejoin="round"
		/>
	</svg>

	<div class="absolute inset-0 flex items-center justify-center px-6">
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

	<NodeHandles {selected} leftStyle="left: 2px;" rightStyle="right: 2px;" />
</div>
