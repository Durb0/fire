import { Ressource } from "./Ressource";
import { Chef, Crewman } from "./FireFighter";
import { InformationCard, InterventionCard } from "./Card";
import { Action } from "./Action";
import { w_game } from "../utils/store";
import { Truck } from "./Truck";
import { PositionType } from "./Enums";
import { getOptions } from "../services/game_service";
import { getCategory } from "../utils/globals";
import { test } from "../services/card_service";

export class Game{

    constructor(){

        getOptions();
        test();

        this.deck = [];
        this.popularity = 100;
        this.operations_in_progress = [];
        this.operations_closed = [];
        this.ressource = new Ressource();
    }

    /**
     * @brief Retire la première carte du Deck.
     */
    removeFirstCard(){
        w_game.update(game => {
            game.deck.shift();
            return game;
        });
    }

    addOperationInProgress(my_op){
        w_game.update(game => {
            game.operations_in_progress.push(my_op);
            return game;
        });
    }

    /**
     * @brief Cherche l'opération en cours où le titre correspond au paramètre.
     * @param {*} title 
     * @returns 
     */
    findOperationInProgress(title){
        return this.operations_in_progress.find(op => op.title == title);
    }
}