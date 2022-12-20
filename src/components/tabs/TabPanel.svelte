<!--
	@component
	
	Le contenu d'un onglet
-->

<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';

	const panel = {};
	const { registerPanel, selectedPanel } = getContext(TABS);

	registerPanel(panel);
</script>

{#if $selectedPanel === panel}
	<slot></slot>
{/if}

<style>
	:host {
		height: -webkit-fill-available;
	}
</style>