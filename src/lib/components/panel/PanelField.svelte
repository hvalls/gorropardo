<script lang="ts">
	interface Props {
		label: string;
		value: string;
		placeholder?: string;
		multiline?: boolean;
		onchange?: (value: string) => void;
	}

	let { label, value, placeholder = '', multiline = false, onchange }: Props = $props();

	const fieldId = $derived(`field-${label.toLowerCase().replace(/\s+/g, '-')}`);
</script>

<div class="flex flex-col gap-1">
	<label for={fieldId} class="text-xs font-medium text-panel-label uppercase tracking-wide">{label}</label>
	{#if multiline}
		<textarea
			id={fieldId}
			class="text-sm text-input-text border border-input-border rounded px-2 py-1.5 resize-none focus:outline-none focus:ring-1 focus:ring-input-focus bg-input-bg"
			rows="3"
			{placeholder}
			{value}
			oninput={(e) => onchange?.((e.target as HTMLTextAreaElement).value)}
		></textarea>
	{:else}
		<input
			id={fieldId}
			type="text"
			class="text-sm text-input-text border border-input-border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-input-focus bg-input-bg"
			{placeholder}
			{value}
			oninput={(e) => onchange?.((e.target as HTMLInputElement).value)}
		/>
	{/if}
</div>
