<script lang="ts">
	import type { NodeProps, Node } from '@xyflow/svelte';
	import type { NodeMetadata } from '$lib/types';
	import { get } from 'svelte/store';
	import { selection } from '$lib/stores/selection';
	import { diagram } from '$lib/stores/diagram';

	type NodeData = Node<{ metadata: NodeMetadata }>;
	let { id, data, selected = false }: NodeProps<NodeData> = $props();

	let editing = $state(false);
	let editValue = $state('');
	let textareaEl: HTMLTextAreaElement | null = $state(null);

	$effect(() => {
		if (editing && textareaEl) {
			textareaEl.focus();
			textareaEl.select();
		}
	});

	function handleClick() {
		selection.set({ nodeIds: [id], edgeIds: [] });
	}

	function startEdit(e: MouseEvent) {
		e.stopPropagation();
		editValue = data.metadata.name;
		editing = true;
	}

	function commitEdit() {
		const trimmed = editValue.trim();
		const currentNode = get(diagram).nodes.find((n) => n.id === id);
		if (currentNode)
			diagram.updateNode(id, { metadata: { ...currentNode.metadata, name: trimmed || ' ' } });
		editing = false;
	}

	function onKeyDown(e: KeyboardEvent) {
		e.stopPropagation();
		if (e.key === 'Escape') editing = false;
		// Enter adds newlines; Ctrl+Enter commits
		if (e.key === 'Enter' && e.ctrlKey) commitEdit();
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="w-[160px] min-h-[100px] rounded-sm shadow-md cursor-move select-none transition-all bg-amber-50 border border-amber-200 {selected ? 'ring-2 ring-selected shadow-lg' : ''}"
	onclick={handleClick}
	ondblclick={startEdit}
>
	<!-- Fold corner decoration -->
	<div class="absolute top-0 right-0 w-0 h-0 border-t-[16px] border-l-[16px] border-t-amber-200 border-l-transparent"></div>

	<div class="p-3 pr-5">
		{#if editing}
			<textarea
				bind:this={textareaEl}
				bind:value={editValue}
				onblur={commitEdit}
				onkeydown={onKeyDown}
				rows={4}
				class="w-full text-sm text-amber-900 bg-transparent resize-none outline-none leading-snug"
			></textarea>
		{:else}
			<p class="text-sm text-amber-900 leading-snug whitespace-pre-wrap break-words">
				{data.metadata.name || 'Double-click to edit'}
			</p>
		{/if}
	</div>
</div>
