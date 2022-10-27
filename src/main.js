import App from './App.svelte';
import {Game} from './model.js';
import {test} from './card_service.js';

document.body.style.padding = '0';

export let game = new Game();
test();

export const app = new App({
	target: document.body
});

