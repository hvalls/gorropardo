import { toPng } from 'html-to-image';
import type { Diagram } from '$lib/types';

function triggerDownload(dataUrl: string, filename: string) {
	const a = document.createElement('a');
	a.href = dataUrl;
	a.download = filename;
	a.click();
}

export async function exportPng(canvasEl: HTMLElement, name = 'diagram'): Promise<void> {
	const dataUrl = await toPng(canvasEl, { cacheBust: true });
	triggerDownload(dataUrl, `${name}.png`);
}

export function saveDiagram(data: Diagram, name = 'diagram'): void {
	const json = JSON.stringify(data, null, 2);
	const blob = new Blob([json], { type: 'application/json' });
	const url = URL.createObjectURL(blob);
	triggerDownload(url, `${name}.gorropardo`);
	URL.revokeObjectURL(url);
}
