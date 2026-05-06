<script lang="ts">
    import PanelField from "./PanelField.svelte";
    import { diagram } from "$lib/stores/diagram";
    import type { DiagramEdge } from "$lib/types";

    interface Props {
        edge: DiagramEdge;
    }

    let { edge }: Props = $props();

    function update(field: keyof DiagramEdge, value: string) {
        diagram.updateEdge(edge.id, { [field]: value } as Partial<DiagramEdge>);
    }

    const directions = [
        { value: "forward", label: "→" },
        { value: "backward", label: "←" },
        { value: "both", label: "↔" },
        { value: "none", label: "—" },
    ] as const;

    const strokeStyles = [
        { value: "solid", label: "—" },
        { value: "dashed", label: "- -" },
        { value: "dotted", label: "···" },
    ] as const;
</script>

<div class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
        <span
            class="text-xs font-medium text-panel-muted uppercase tracking-wide"
            >Direction</span
        >
        <div class="flex gap-1">
            {#each directions as opt}
                <button
                    onclick={() => update("direction", opt.value)}
                    class="flex-1 py-1 text-sm rounded transition-colors {edge.direction ===
                    opt.value
                        ? 'bg-btn-active text-input-text'
                        : 'bg-panel-bg text-panel-label hover:bg-btn-hover border border-panel-border'}"
                >
                    {opt.label}
                </button>
            {/each}
        </div>
    </div>

    <div class="flex flex-col gap-1">
        <span
            class="text-xs font-medium text-panel-muted uppercase tracking-wide"
            >Stroke</span
        >
        <div class="flex gap-1">
            {#each strokeStyles as opt}
                <button
                    onclick={() => update("strokeStyle", opt.value)}
                    class="flex-1 py-1 text-sm rounded transition-colors tracking-widest {edge.strokeStyle ===
                    opt.value
                        ? 'bg-btn-active text-input-text'
                        : 'bg-panel-bg text-panel-label hover:bg-btn-hover border border-panel-border'}"
                >
                    {opt.label}
                </button>
            {/each}
        </div>
    </div>

    <PanelField
        label="Label"
        value={edge.label}
        placeholder="e.g. GET /api/users"
        onchange={(v) => update("label", v)}
    />

    <PanelField
        label="Description"
        value={edge.description}
        placeholder="What flows through this connection?"
        multiline
        onchange={(v) => update("description", v)}
    />
</div>
