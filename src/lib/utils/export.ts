import { toPng } from 'html-to-image';

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

export function exportSvg(canvasEl: HTMLElement, name = 'diagram'): void {
	const svgEl = canvasEl.querySelector('svg');
	if (!svgEl) return;

	const clone = svgEl.cloneNode(true) as SVGElement;
	const serializer = new XMLSerializer();
	const svgStr = serializer.serializeToString(clone);
	const blob = new Blob([svgStr], { type: 'image/svg+xml' });
	const url = URL.createObjectURL(blob);
	triggerDownload(url, `${name}.svg`);
	URL.revokeObjectURL(url);
}
