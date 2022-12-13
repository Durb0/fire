<script context="module">
	import { w_screen } from '../../utils/store';

	let screen;
	export let el;
	
	w_screen.subscribe(value=>{
		screen = value;
	})

	export const TABS = {};
</script>

<script>
	import { setContext, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	const tabs = [];
	const panels = [];
	const selectedTab = writable(null);
	const selectedPanel = writable(null);

	setContext(TABS, {
		registerTab: tab => {
			tabs.push(tab);
			selectedTab.update(current => current || tab);
			
			onDestroy(() => {
				const i = tabs.indexOf(tab);
				tabs.splice(i, 1);
				selectedTab.update(current => current === tab ? (tabs[i] || tabs[tabs.length - 1]) : current);
			});
		},

		registerPanel: panel => {
			panels.push(panel);
			selectedPanel.update(current => current || panel);
			
			onDestroy(() => {
				const i = panels.indexOf(panel);
				panels.splice(i, 1);
				selectedPanel.update(current => current === panel ? (panels[i] || panels[panels.length - 1]) : current);
			});
		},

		selectTab: tab => {
			const i = tabs.indexOf(tab);
			selectedTab.set(tab);
			selectedPanel.set(panels[i]);
		},

		selectedTab,
		selectedPanel
	});
</script>

<div class="tabs" bind:this={el}
class:tabs--landscape={screen=="landscape"}>
	<slot></slot>
</div>


<style>

	

    .tabs{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
        align-content: stretch;
    }

	

	.tabs--landscape{
		height: calc(100vh - 65px);
	}
</style>