<script lang="ts">
	import {
		SvelteFlow,
		Background,
		MarkerType,
		PanOnScrollMode,
		SelectionMode,
		type Node,
		type Edge,
		type Connection
	} from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';

	import ServiceNode from './nodes/ServiceNode.svelte';
	import DatabaseNode from './nodes/DatabaseNode.svelte';
	import MessageChannelNode from './nodes/MessageChannelNode.svelte';
	import WebappNode from './nodes/WebappNode.svelte';
	import CacheNode from './nodes/CacheNode.svelte';
	import ApiGatewayNode from './nodes/ApiGatewayNode.svelte';
	import ExternalNode from './nodes/ExternalNode.svelte';
	import WorkerNode from './nodes/WorkerNode.svelte';
	import UserNode from './nodes/UserNode.svelte';
	import ObjectStorageNode from './nodes/ObjectStorageNode.svelte';
	import DesktopAppNode from './nodes/DesktopAppNode.svelte';
	import MobileAppNode from './nodes/MobileAppNode.svelte';
	import NoteNode from './nodes/NoteNode.svelte';

	import EdgeComponent from './edges/Edge.svelte';
	import MiddleMousePan from './MiddleMousePan.svelte';

	import { diagram } from '$lib/stores/diagram';
	import { selection } from '$lib/stores/selection';
	import { newId } from '$lib/utils/idgen';
	import type { DiagramNode, DiagramEdge } from '$lib/types';

	const nodeTypes = {
		service: ServiceNode,
		database: DatabaseNode,
		messageChannel: MessageChannelNode,
		webapp: WebappNode,
		cache: CacheNode,
		apiGateway: ApiGatewayNode,
		external: ExternalNode,
		worker: WorkerNode,
		user: UserNode,
		objectStorage: ObjectStorageNode,
		desktopApp: DesktopAppNode,
		mobileApp: MobileAppNode,
		note: NoteNode
	};

	const edgeTypes = {
		animated: EdgeComponent
	};

	const defaultEdgeOptions = {
		type: 'animated'
	};

	let nodes = $derived(
		$diagram.nodes.map((n) => ({
			id: n.id,
			type: n.kind,
			position: n.position,
			selected: $selection?.nodeIds.includes(n.id) ?? false,
			data: { metadata: n.metadata, kind: n.kind }
		})) as Node[]
	);

	let edges = $derived(
		$diagram.edges.map((e) => ({
			id: e.id,
			source: e.nodeA,
			target: e.nodeB,
			sourceHandle: e.handleA,
			targetHandle: e.handleB,
			type: 'animated',
			label: e.label,
			data: { description: e.description, strokeStyle: e.strokeStyle },
			markerEnd: (e.direction === 'forward' || e.direction === 'both')
				? { type: MarkerType.ArrowClosed, color: '#94a3b8' /* --color-node-stroke */ }
				: undefined,
			markerStart: (e.direction === 'backward' || e.direction === 'both')
				? { type: MarkerType.ArrowClosed, color: '#94a3b8' /* --color-node-stroke */ }
				: undefined
		})) as Edge[]
	);

	let isDragging = false;

	function onnodedragstart() {
		isDragging = true;
	}

	function onnodedragstop({ targetNode, nodes: draggedNodes }: { targetNode: Node | null; nodes: Node[]; event: MouseEvent | TouchEvent }) {
		isDragging = false;
		if (draggedNodes.length > 0) {
			for (const n of draggedNodes) diagram.updateNodePosition(n.id, n.position);
		} else if (targetNode) {
			diagram.updateNodePosition(targetNode.id, targetNode.position);
		}
	}

	function onconnect(conn: Connection) {
		if (!conn.source || !conn.target) return;
		const newEdge: DiagramEdge = {
			id: newId(),
			nodeA: conn.source,
			nodeB: conn.target,
			handleA: conn.sourceHandle ?? undefined,
			handleB: conn.targetHandle ?? undefined,
			label: '',
			description: '',
			direction: 'forward',
			strokeStyle: 'solid'
		};
		diagram.addEdge(newEdge);
		selection.set({ nodeIds: [], edgeIds: [newEdge.id] });
	}

	function onpaneclick(_: { event: MouseEvent }) {
		selection.set(null);
	}

	function onedgeclick({ edge }: { edge: Edge; event: MouseEvent }) {
		selection.set({ nodeIds: [], edgeIds: [edge.id] });
	}

	function onselectionchange({ nodes: selectedNodes, edges: selectedEdges }: { nodes: Node[]; edges: Edge[] }) {
		if (isDragging) return;
		if (selectedNodes.length === 0 && selectedEdges.length === 0) return;
		selection.set({
			nodeIds: selectedNodes.map((n) => n.id),
			edgeIds: selectedEdges.map((e) => e.id)
		});
	}

	let clipboard: { nodes: DiagramNode[]; edges: DiagramEdge[] } | null = $state(null);

	function onKeyDown(event: KeyboardEvent) {
		if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;

		if ((event.key === 'Delete' || event.key === 'Backspace') && $selection) {
			for (const id of $selection.nodeIds) diagram.removeNode(id);
			for (const id of $selection.edgeIds) diagram.removeEdge(id);
			selection.set(null);
			return;
		}

		if ((event.metaKey || event.ctrlKey) && event.key === 'c' && $selection) {
			const nodeIds = new Set($selection.nodeIds);
			clipboard = {
				nodes: $diagram.nodes.filter((n) => nodeIds.has(n.id)),
				edges: $diagram.edges.filter((e) => nodeIds.has(e.nodeA) && nodeIds.has(e.nodeB))
			};
			return;
		}

		if ((event.metaKey || event.ctrlKey) && event.key === 'v' && clipboard) {
			const idMap = new Map<string, string>();
			for (const n of clipboard.nodes) idMap.set(n.id, newId());

			const newNodes: DiagramNode[] = clipboard.nodes.map((n) => ({
				...n,
				id: idMap.get(n.id)!,
				position: { x: n.position.x + 30, y: n.position.y + 30 }
			}));
			const newEdges: DiagramEdge[] = clipboard.edges.map((e) => ({
				...e,
				id: newId(),
				nodeA: idMap.get(e.nodeA)!,
				nodeB: idMap.get(e.nodeB)!
			}));

			for (const n of newNodes) diagram.addNode(n);
			for (const e of newEdges) diagram.addEdge(e);
			selection.set({ nodeIds: newNodes.map((n) => n.id), edgeIds: newEdges.map((e) => e.id) });
		}
	}
</script>

<svelte:window onkeydown={onKeyDown} />

<div class="w-full h-full bg-slate-900">
	<SvelteFlow
		{nodes}
		{edges}
		{nodeTypes}
		{edgeTypes}
		{defaultEdgeOptions}
		style="background: var(--color-canvas-bg);"
		fitView
		panOnScroll={true}
		zoomOnScroll={false}
		panOnScrollMode={PanOnScrollMode.Free}
		zoomOnPinch={true}
		panOnDrag={false}
		selectionOnDrag={true}
		selectionMode={SelectionMode.Partial}
		proOptions={{ hideAttribution: true }}
		{onnodedragstart}
		{onnodedragstop}
		{onconnect}
		{onpaneclick}
		{onedgeclick}
		{onselectionchange}
	>
		<Background color="#1e293b" /><!-- --color-canvas-grid -->
		<MiddleMousePan />
	</SvelteFlow>
</div>
