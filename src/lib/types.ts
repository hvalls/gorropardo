export type NodeKind = 'service' | 'database' | 'messageChannel' | 'webapp' | 'desktopApp' | 'mobileApp' | 'cache' | 'apiGateway' | 'external' | 'worker' | 'user' | 'objectStorage' | 'note';

export interface NodeMetadata {
	name: string;
	description: string;
	techStack: string[];
	owner: string;
	repoUrl: string;
}

export interface DiagramNode {
	id: string;
	kind: NodeKind;
	position: { x: number; y: number };
	metadata: NodeMetadata;
}

export interface DiagramEdge {
	id: string;
	nodeA: string;
	nodeB: string;
	handleA?: string;
	handleB?: string;
	label: string;
	description: string;
	direction: 'forward' | 'backward' | 'both' | 'none';
	strokeStyle: 'solid' | 'dotted' | 'dashed';
}

export interface Diagram {
	nodes: DiagramNode[];
	edges: DiagramEdge[];
}

export interface AppSelection {
	nodeIds: string[];
	edgeIds: string[];
}
