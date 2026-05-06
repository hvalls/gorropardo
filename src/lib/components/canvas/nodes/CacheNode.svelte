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
	<svg width="60" height="76" viewBox="0 0 60 76">
		<polygon
			points="44,2 18,40 32,40 12,74 54,28 38,28"
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

	<NodeHandles {selected} topStyle="top: 2px;" bottomStyle="bottom: 0px;" leftStyle="top: 38px; left: 0px;" rightStyle="top: 38px; right: 0px;" />
</div>
