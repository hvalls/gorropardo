<script lang="ts">
	import type { NodeProps, Node } from '@xyflow/svelte';
	import type { NodeMetadata } from '$lib/types';
	import { useNodeEdit } from './useNodeEdit.svelte';
	import NodeHandles from './NodeHandles.svelte';

	type NodeData = Node<{ metadata: NodeMetadata }>;
	let { id, data, selected = false }: NodeProps<NodeData> = $props();
	const edit = useNodeEdit(() => id, () => data);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="min-w-[140px] rounded border-2 shadow-sm cursor-move overflow-hidden transition-all border-node-border bg-node-fill {selected ? 'ring-2 ring-selected shadow-md' : ''}"
	onclick={edit.handleClick}
	ondblclick={edit.startEdit}
>
	<!-- Browser chrome bar -->
	<div class="bg-node-header px-2 py-1 flex items-center gap-1.5">
		<span class="w-2 h-2 rounded-full bg-red-400"></span>
		<span class="w-2 h-2 rounded-full bg-yellow-400"></span>
		<span class="w-2 h-2 rounded-full bg-green-400"></span>
	</div>

	<!-- Content -->
	<div class="px-3 py-2">
		{#if edit.editing}
			<input
				bind:this={edit.inputEl}
				bind:value={edit.editValue}
				onblur={edit.commitEdit}
				onkeydown={edit.onInputKeyDown}
				class="w-full text-sm font-medium text-node-text bg-node-fill border border-input-focus rounded px-1 outline-none"
			/>
		{:else}
			<p class="text-sm font-medium text-node-text">{data.metadata.name}</p>
		{/if}
	</div>
	<NodeHandles {selected} />
</div>
