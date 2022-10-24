import App from './App.svelte';
import {Game} from './model.js';

document.body.style.padding = '0';

export let game = new Game();

export const app = new App({
	target: document.body
});

