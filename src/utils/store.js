import { writable } from "svelte/store";
import { Game } from "../models/Game";


export let w_idCard = writable(0);
export let w_idFireFighter = writable(0);
export let w_idTruck = writable(0);
export let w_idOperation = writable(0);
export let w_game = writable(new Game());
export let w_screen = writable("portrait");


export function newId(writable){
    var id= 0;
    writable.subscribe((value) => {
        id = value;
    });
    writable.update((value) => value + 1);
    return id;
}