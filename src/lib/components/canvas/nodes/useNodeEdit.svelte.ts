import { get } from 'svelte/store';
import { selection } from '$lib/stores/selection';
import { diagram } from '$lib/stores/diagram';
import type { NodeMetadata } from '$lib/types';

export function useNodeEdit(getId: () => string, getData: () => { metadata: NodeMetadata }) {
	let editing = $state(false);
	let editValue = $state('');
	let inputEl: HTMLInputElement | null = $state(null);

	$effect(() => {
		if (editing && inputEl) {
			inputEl.focus();
			inputEl.select();
		}
	});

	function handleClick() {
		selection.set({ nodeIds: [getId()], edgeIds: [] });
	}

	function startEdit(e: MouseEvent) {
		e.stopPropagation();
		editValue = getData().metadata.name;
		editing = true;
	}

	function commitEdit() {
		const trimmed = editValue.trim();
		const id = getId();
		const currentNode = get(diagram).nodes.find((n) => n.id === id);
		if (trimmed && currentNode)
			diagram.updateNode(id, { metadata: { ...currentNode.metadata, name: trimmed } });
		editing = false;
	}

	function onInputKeyDown(e: KeyboardEvent) {
		e.stopPropagation();
		if (e.key === 'Enter') commitEdit();
		if (e.key === 'Escape') editing = false;
	}

	return {
		get editing() { return editing; },
		get editValue() { return editValue; },
		set editValue(v: string) { editValue = v; },
		get inputEl() { return inputEl; },
		set inputEl(el: HTMLInputElement | null) { inputEl = el; },
		handleClick,
		startEdit,
		commitEdit,
		onInputKeyDown,
	};
}
