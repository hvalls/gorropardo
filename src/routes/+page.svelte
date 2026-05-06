<script lang="ts">
    import DiagramCanvas from "$lib/components/canvas/DiagramCanvas.svelte";
    import CanvasToolbar from "$lib/components/canvas/controls/CanvasToolbar.svelte";
    import DetailPanel from "$lib/components/panel/DetailPanel.svelte";
    import ExportButton from "$lib/components/persistence/ExportButton.svelte";
    import { diagram } from "$lib/stores/diagram";

    let canvasRef: HTMLElement | null = $state(null);
    let hasNodes = $derived($diagram.nodes.length > 0);
</script>

<div class="h-screen relative">
    <div class="absolute inset-0" bind:this={canvasRef}>
        <DiagramCanvas />
    </div>
    <DetailPanel />

    <header class="absolute top-0 left-0 right-0 grid grid-cols-[1fr_auto_1fr] items-center px-4 py-3 z-10 pointer-events-none">
        <div></div>
        <div class="flex justify-center pointer-events-auto">
            <CanvasToolbar />
        </div>
        <div class="flex justify-end pointer-events-auto">
            <ExportButton {canvasRef} />
        </div>
    </header>
</div>
