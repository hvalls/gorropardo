<script lang="ts">
	import { saveDiagram } from '$lib/utils/export';
	import { diagram } from '$lib/stores/diagram';

	function handleSave() {
		saveDiagram($diagram, 'diagram');
	}
</script>

<button
	onclick={handleSave}
	title="Save"
	class="flex items-center justify-center p-2 border border-slate-700 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-slate-200"
>
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
		<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
		<polyline points="17 21 17 13 7 13 7 21"/>
		<polyline points="7 3 7 8 15 8"/>
	</svg>
</button>
