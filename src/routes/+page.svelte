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
        <div class="flex justify-end items-center gap-2 pointer-events-auto">
            <a
                href="https://github.com/hvalls/gorropardo"
                target="_blank"
                rel="noopener noreferrer"
                title="View source on GitHub"
                class="flex items-center justify-center w-8 h-8 rounded hover:bg-btn-hover transition-colors text-panel-heading"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
                </svg>
            </a>
            <ExportButton {canvasRef} />
        </div>
    </header>
</div>
