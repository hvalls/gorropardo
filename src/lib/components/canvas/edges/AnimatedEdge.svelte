<script lang="ts">
	import { BaseEdge, getBezierPath } from '@xyflow/svelte';
	import type { EdgeProps } from '@xyflow/svelte';
	import { selection } from '$lib/stores/selection';
	import { diagram } from '$lib/stores/diagram';

	let {
		id,
		sourceX,
		sourceY,
		targetX,
		targetY,
		sourcePosition,
		targetPosition,
		data,
		label,
		markerEnd,
		markerStart,
		style
	}: EdgeProps = $props();

	let [path, labelX, labelY] = $derived(
		getBezierPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition })
	);

	let isSelected = $derived($selection?.edgeIds.includes(id) ?? false);
	let diagramEdge = $derived($diagram.edges.find((e) => e.id === id));

	const dasharrays: Record<string, string> = { solid: 'none', dotted: '2 5', dashed: '8 5' };

	let stroke = $derived(isSelected ? 'var(--color-node-stroke-selected)' : 'var(--color-node-stroke)');
	let strokeDasharray = $derived(dasharrays[diagramEdge?.strokeStyle ?? 'solid'] ?? 'none');

	const lineHeight = 14;
	let labelLines = $derived(label ? String(label).split('\n') : []);
	let labelStartY = $derived(labelY - ((labelLines.length - 1) / 2) * lineHeight);
</script>

<g>
	<BaseEdge
		{id}
		{path}
		markerEnd={markerEnd}
		markerStart={markerStart}
		style="{style ?? ''} stroke: {stroke}; stroke-width: {isSelected ? 2.5 : 1.5}; stroke-dasharray: {strokeDasharray};"
	/>

	{#if labelLines.length}
		<defs>
			<filter id="edge-label-bg-{id}" x="-8%" y="-40%" width="116%" height="180%">
				<feFlood result="bg" style="flood-color: var(--color-canvas-bg, white);" />
				<feMerge>
					<feMergeNode in="bg" />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>
		</defs>
		<text
			x={labelX}
			y={labelStartY}
			text-anchor="middle"
			dominant-baseline="middle"
			class="pointer-events-none select-none"
			style="font-size: 11px; fill: var(--color-panel-text-dim); filter: url(#edge-label-bg-{id});"
		>
			{#each labelLines as line, i}
				<tspan x={labelX} dy={i === 0 ? 0 : lineHeight}>{line}</tspan>
			{/each}
		</text>
	{/if}

</g>
