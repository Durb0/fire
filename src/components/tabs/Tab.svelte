<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';

	const tab = {};
	const { registerTab, selectTab, selectedTab } = getContext(TABS);

	registerTab(tab);
</script>

<style>
	button {
        cursor: pointer;
        background: #A77B54;
        color: #F5E2D3;
        border: none;
        height: 100%;
        border-radius: 10px 10px 0 0;
        text-transform: uppercase;
        width: 100px;
        min-width: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
	}

    button:active{
        background-color: #E9D0B5;
    }
	
	.selected {
        background: #E9D0B5;
        color: #E2082B;
	}
</style>

<button class:selected="{$selectedTab === tab}" on:click="{() => selectTab(tab)}">
	<slot></slot>
</button>