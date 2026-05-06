<script lang="ts">
	import { Handle, Position } from '@xyflow/svelte';

	interface Props {
		selected: boolean;
		topStyle?: string;
		bottomStyle?: string;
		leftStyle?: string;
		rightStyle?: string;
	}

	let { selected, topStyle, bottomStyle, leftStyle, rightStyle }: Props = $props();
	const cls = $derived(selected ? '' : 'opacity-0 pointer-events-none');
</script>

<Handle type="target" position={Position.Top}    id="top-t"   style={topStyle}    class={cls} />
<Handle type="source" position={Position.Top}    id="top-s"   style={topStyle}    class={cls} />
<Handle type="target" position={Position.Bottom} id="bot-t"   style={bottomStyle} class={cls} />
<Handle type="source" position={Position.Bottom} id="bot-s"   style={bottomStyle} class={cls} />
<Handle type="target" position={Position.Left}   id="left-t"  style={leftStyle}   class={cls} />
<Handle type="source" position={Position.Left}   id="left-s"  style={leftStyle}   class={cls} />
<Handle type="target" position={Position.Right}  id="right-t" style={rightStyle}  class={cls} />
<Handle type="source" position={Position.Right}  id="right-s" style={rightStyle}  class={cls} />
