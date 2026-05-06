<script lang="ts">
    import DiagramCanvas from "$lib/components/canvas/DiagramCanvas.svelte";
    import CanvasToolbar from "$lib/components/canvas/controls/CanvasToolbar.svelte";
    import DetailPanel from "$lib/components/panel/DetailPanel.svelte";
    import SaveButton from "$lib/components/persistence/SaveButton.svelte";
    import OpenButton from "$lib/components/persistence/OpenButton.svelte";
    import ExportImageButton from "$lib/components/persistence/ExportImageButton.svelte";
    import GitHubLink from "$lib/components/shared/GitHubLink.svelte";
    import { diagram } from "$lib/stores/diagram";

    let canvasRef: HTMLElement | null = $state(null);
    let hasNodes = $derived($diagram.nodes.length > 0);
</script>

<div class="h-screen relative">
    <div class="absolute inset-0" bind:this={canvasRef}>
        <DiagramCanvas />
    </div>
    <DetailPanel />

    <GitHubLink />

    <header class="absolute top-0 left-0 right-0 grid grid-cols-[1fr_auto_1fr] items-center px-4 py-3 z-10 pointer-events-none">
        <div></div>
        <div class="flex justify-center pointer-events-auto">
            <CanvasToolbar />
        </div>
        <div class="flex justify-end items-center gap-2 pointer-events-auto">
            <OpenButton />
            <SaveButton />
            <ExportImageButton {canvasRef} />
        </div>
    </header>
</div>
