import { writable } from 'svelte/store';
import type { Diagram, DiagramNode, DiagramEdge } from '$lib/types';

function createDiagramStore() {
	const { subscribe, update, set: writeDiagram } = writable<Diagram>({ nodes: [], edges: [] });

	return {
		subscribe,

		addNode(node: DiagramNode) {
			update((d) => ({ ...d, nodes: [...d.nodes, node] }));
		},

		updateNode(id: string, patch: Partial<DiagramNode>) {
			update((d) => ({
				...d,
				nodes: d.nodes.map((n) => (n.id === id ? { ...n, ...patch } : n))
			}));
		},

		updateNodePosition(id: string, position: { x: number; y: number }) {
			update((d) => ({
				...d,
				nodes: d.nodes.map((n) => (n.id === id ? { ...n, position } : n))
			}));
		},

		removeNode(id: string) {
			update((d) => ({
				...d,
				nodes: d.nodes.filter((n) => n.id !== id),
				edges: d.edges.filter((e) => e.nodeA !== id && e.nodeB !== id)
			}));
		},

		addEdge(edge: DiagramEdge) {
			update((d) => ({ ...d, edges: [...d.edges, edge] }));
		},

		updateEdge(id: string, patch: Partial<DiagramEdge>) {
			update((d) => ({
				...d,
				edges: d.edges.map((e) => (e.id === id ? { ...e, ...patch } : e))
			}));
		},

		removeEdge(id: string) {
			update((d) => ({ ...d, edges: d.edges.filter((e) => e.id !== id) }));
		},

		set(data: Diagram) {
			writeDiagram(data);
		}
	};
}

export const diagram = createDiagramStore();
