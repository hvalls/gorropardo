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
		<!-- Bucket body fill: matches the outline silhouette (sides + bottom arc + top arc) -->
		<path d="M 18,20 L 30,78 A 40,8 0 0,0 110,78 L 122,20 A 52,11 0 0,1 18,20 Z" style="fill: var(--color-node-fill)" />
		<!-- Top rim fill -->
		<ellipse cx="70" cy="20" rx="52" ry="11" style="fill: var(--color-node-cap)" />
		<!-- Outline: bucket sides + bottom arc, then top rim inner line -->
		<path
			d="M 18,20 L 30,78 A 40,8 0 0,0 110,78 L 122,20 A 52,11 0 0,1 18,20 Z M 18,20 A 52,11 0 0,0 122,20"
			style="fill: none; stroke: {stroke}; stroke-width: {strokeWidth}"
		/>
	</svg>

	<div class="absolute inset-0 flex items-center justify-center px-4" style="padding-top: 18px;">
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

	<NodeHandles {selected} topStyle="top: 8px;" bottomStyle="bottom: 8px;" leftStyle="left: 14px;" rightStyle="right: 14px;" />
</div>
