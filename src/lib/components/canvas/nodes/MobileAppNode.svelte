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
	class="w-[80px] rounded-xl border-2 shadow-sm cursor-move overflow-hidden transition-all border-node-border bg-node-fill {selected ? 'ring-2 ring-selected shadow-md' : ''}"
	onclick={edit.handleClick}
	ondblclick={edit.startEdit}
>
	<!-- Top notch -->
	<div class="bg-node-header px-2 py-1 flex justify-center">
		<span class="w-1.5 h-1.5 rounded-full bg-node-kind opacity-40"></span>
	</div>

	<!-- Content -->
	<div class="px-2 py-3 flex items-center justify-center min-h-[60px]">
		{#if edit.editing}
			<input
				bind:this={edit.inputEl}
				bind:value={edit.editValue}
				onblur={edit.commitEdit}
				onkeydown={edit.onInputKeyDown}
				class="w-full text-xs font-medium text-node-text text-center bg-node-fill border border-input-focus rounded px-1 outline-none"
			/>
		{:else}
			<p class="text-xs font-medium text-node-text text-center leading-tight">{data.metadata.name}</p>
		{/if}
	</div>

	<!-- Home bar -->
	<div class="bg-node-header px-2 py-1 flex justify-center">
		<span class="w-6 h-1 rounded-full bg-node-kind opacity-40"></span>
	</div>
	<NodeHandles {selected} />
</div>
