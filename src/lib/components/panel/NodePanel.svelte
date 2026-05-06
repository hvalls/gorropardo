<script lang="ts">
    import { capitalize } from "$lib/utils/strings";
    import PanelField from "./PanelField.svelte";
    import Badge from "$lib/components/shared/Badge.svelte";
    import { diagram } from "$lib/stores/diagram";
    import type { DiagramNode, NodeKind } from "$lib/types";

    interface Props {
        node: DiagramNode;
    }

    let { node }: Props = $props();

    const kindBadgeColor: Record<
        NodeKind,
        "blue" | "green" | "amber" | "slate" | "violet"
    > = {
        service: "blue",
        database: "green",
        messageChannel: "amber",
        webapp: "violet",
        cache: "blue",
        apiGateway: "amber",
        external: "slate",
        worker: "slate",
        user: "slate",
        objectStorage: "slate",
        desktopApp: "violet",
        mobileApp: "violet",
        note: "amber",
    };

    const kindLabels: Record<NodeKind, string> = {
        service: "service",
        database: "database",
        messageChannel: "message channel",
        webapp: "web app",
        cache: "cache",
        apiGateway: "api gateway",
        external: "external system",
        worker: "worker",
        user: "user",
        objectStorage: "object storage",
        desktopApp: "desktop app",
        mobileApp: "mobile app",
        note: "note",
    };

    function update(field: string, value: string) {
        diagram.updateNode(node.id, {
            metadata: { ...node.metadata, [field]: value },
        });
    }

    const kindDescriptions: Partial<Record<NodeKind, string>> = {
        service: "A backend microservice or application component.",
        database: "Persistent data store for structured or relational data.",
        messageChannel: "Async communication channel between services (queue, topic, bus).",
        webapp: "Browser-based user interface or frontend application.",
        cache: "In-memory store for fast, temporary data access.",
        apiGateway: "Entry point that routes, authenticates, and manages API traffic.",
        external: "Third-party system or external dependency outside your control.",
        worker: "Background process that handles async or scheduled tasks.",
        objectStorage: "Blob or file storage for unstructured data (e.g. S3).",
        desktopApp: "Native application running on a user's desktop.",
        mobileApp: "Native application running on a mobile device.",
    };

    function updateTechStack(value: string) {
        diagram.updateNode(node.id, {
            metadata: {
                ...node.metadata,
                techStack: value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
            },
        });
    }
</script>

<div class="flex flex-col gap-4">
    {#if node.kind === "note"}
        <PanelField
            label="Content"
            value={node.metadata.name}
            placeholder="Write your note..."
            multiline
            onchange={(v) => update("name", v)}
        />
    {:else}
        <div class="flex items-center gap-2">
            <Badge
                label={capitalize(kindLabels[node.kind])}
                color={kindBadgeColor[node.kind]}
            />
        </div>

        <PanelField
            label="Name"
            value={node.metadata.name}
            placeholder={node.kind === "user"
                ? "User, Dev, Admin..."
                : "Component name"}
            onchange={(v) => update("name", v)}
        />

        <PanelField
            label="Description"
            value={node.metadata.description}
            placeholder={node.kind === "user"
                ? "Who is this user?"
                : "What does this component do?"}
            multiline
            onchange={(v) => update("description", v)}
        />

        {#if node.kind !== "user"}
            <PanelField
                label="Tech Stack"
                value={node.metadata.techStack.join(", ")}
                placeholder="Node.js, PostgreSQL, Redis"
                onchange={updateTechStack}
            />

            <PanelField
                label="Owner"
                value={node.metadata.owner}
                placeholder="Team or person"
                onchange={(v) => update("owner", v)}
            />

            <PanelField
                label="Repository URL"
                value={node.metadata.repoUrl}
                placeholder="https://github.com/org/repo"
                onchange={(v) => update("repoUrl", v)}
            />

            {#if node.metadata.repoUrl}
                <a
                    href={node.metadata.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-xs text-blue-400 hover:underline truncate"
                >
                    → Open repository
                </a>
            {/if}
        {/if}

        {#if kindDescriptions[node.kind]}
            <p class="text-xs text-zinc-500 border-t border-zinc-800 pt-3 leading-snug">
                {kindDescriptions[node.kind]}
            </p>
        {/if}
    {/if}
</div>
