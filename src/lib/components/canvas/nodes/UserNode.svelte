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
	class="cursor-move select-none flex flex-col items-center gap-1"
	style="width: 80px;"
	onclick={edit.handleClick}
	ondblclick={edit.startEdit}
>
	<svg width="56" height="64" viewBox="0 0 56 64">
		<!-- head -->
		<circle cx="28" cy="16" r="14" style="fill: var(--color-node-fill); stroke: {stroke}; stroke-width: {strokeWidth}" />
		<!-- body -->
		<path
			d="M 4,62 Q 4,32 28,32 Q 52,32 52,62 Z"
			style="fill: var(--color-node-fill); stroke: {stroke}; stroke-width: {strokeWidth}"
			stroke-linejoin="round"
		/>
	</svg>

	{#if edit.editing}
		<input
			bind:this={edit.inputEl}
			bind:value={edit.editValue}
			onblur={edit.commitEdit}
			onkeydown={edit.onInputKeyDown}
			class="w-full text-xs font-medium text-input-text text-center bg-input-bg border border-input-focus rounded px-1 outline-none"
		/>
	{:else}
		<p class="text-xs font-medium text-node-text-dark text-center leading-tight">{data.metadata.name}</p>
	{/if}

	<NodeHandles {selected} topStyle="top: 4px;" bottomStyle="bottom: 0px;" leftStyle="top: 32px; left: 0px;" rightStyle="top: 32px; right: 0px;" />
</div>
