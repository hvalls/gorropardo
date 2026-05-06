<script lang="ts">
	interface Props {
		label: string;
		color?: 'blue' | 'green' | 'amber' | 'slate' | 'violet';
	}

	let { label, color = 'slate' }: Props = $props();

	const colors = {
		blue: 'bg-blue-100 text-blue-700',
		green: 'bg-emerald-100 text-emerald-700',
		amber: 'bg-amber-100 text-amber-700',
		slate: 'bg-slate-100 text-slate-600',
		violet: 'bg-violet-100 text-violet-700'
	};
</script>

<span class="inline-block px-1.5 py-0.5 rounded text-xs font-medium {colors[color]}">{label}</span>
