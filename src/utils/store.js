import { writable } from "svelte/store";
import { Game } from "../models/Game";

/**
 *  Store pour l'id des cartes 
 */
export let w_idCard = writable(0); 
/**
 * Store pour l'id des pompiers
 */
export let w_idFireFighter = writable(0);
/**
 * Store pour l'id des camions
 */
export let w_idTruck = writable(0);
/**
 * Store pour l'id des opérations
 */
export let w_idOperation = writable(0);
/**
 * Store pour le jeu
 */
export let w_game = writable(new Game());
/**
 * Store pour le mode d'affichage
 */
export let w_screen = writable("portrait");

/**
 * 
 * @param {writable} writable Le store a incrémenter
 * @returns l'id incrémenté
 */
export function newId(writable){
    var id= 0;
    writable.subscribe((value) => {
        id = value;
    });
    writable.update((value) => value + 1);
    return id;
}

/**
 * Lorsque le jeu est lancé on lance le jeu
 */
window.addEventListener("start_game", function(){
    w_game.update(game => {
        game.start();
        return game;
    })
});