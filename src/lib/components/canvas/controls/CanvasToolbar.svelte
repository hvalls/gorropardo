<script lang="ts">
    import { diagram } from "$lib/stores/diagram";
    import { selection } from "$lib/stores/selection";
    import { newId } from "$lib/utils/idgen";
    import type { NodeKind, DiagramNode } from "$lib/types";

    const nodeKinds: { kind: NodeKind; label: string }[] = [
        { kind: "user", label: "User" },
        { kind: "webapp", label: "Web App" },
        { kind: "desktopApp", label: "Desktop App" },
        { kind: "mobileApp", label: "Mobile App" },
        { kind: "apiGateway", label: "API Gateway" },
        { kind: "service", label: "Service" },
        { kind: "worker", label: "Worker" },
        { kind: "messageChannel", label: "Message Channel" },
        { kind: "database", label: "Database" },
        { kind: "cache", label: "Cache" },
        { kind: "objectStorage", label: "Object Storage" },
        { kind: "external", label: "External System" },
        { kind: "note", label: "Note" },
    ];

    let nextX = 100;
    let nextY = 100;

    function addNode(kind: NodeKind, label: string) {
        const node: DiagramNode = {
            id: newId(),
            kind,
            position: { x: nextX, y: nextY },
            metadata: {
                name: label,
                description: "",
                techStack: [],
                owner: "",
                repoUrl: "",
            },
        };
        nextX = (nextX + 40) % 400;
        nextY = (nextY + 40) % 300;
        diagram.addNode(node);
        selection.set({ nodeIds: [node.id], edgeIds: [] });
    }
</script>

<div
    class="flex items-center gap-1 bg-panel-bg border border-panel-border rounded-lg shadow-sm px-2 py-1.5 overflow-x-auto max-w-full"
>
    {#each nodeKinds as { kind, label }}
        <button
            onclick={() => addNode(kind, label)}
            title="Add {label}"
            class="flex items-center gap-1 px-2 py-1 text-xs rounded hover:bg-btn-hover transition-colors text-panel-heading"
        >
            <span>{label}</span>
        </button>
    {/each}
</div>
