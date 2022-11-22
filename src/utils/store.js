import { writable } from "svelte/store";
import { Game } from "../models/Game";

export let w_cards = writable([]);
export let w_idCard = writable(0);
export let w_idFireFighter = writable(0);
export let w_idTruck = writable(0);
export let w_game = writable(new Game());

export function newIdCard(){
    var id= 0;
    w_idCard.subscribe((value) => {
        id = value;
    });
    w_idCard.update((value) => value + 1);
    return id;
}

export function newIdFireFighter(){
    var id= 0;
    w_idFireFighter.subscribe((value) => {
        id = value;
    });
    w_idFireFighter.update((value) => value + 1);
    return id;
}

export function newIdTruck(){
    var id= 0;
    w_idTruck.subscribe((value) => {
        id = value;
    });
    w_idTruck.update((value) => value + 1);
    return id;
}