import { Ressource } from "./Ressource";
import { w_game } from "../utils/store";
import { getOptions } from "../services/game_service";
import { test } from "../services/card_service";
import { StateRessource } from "./Enums";
import { InformationCard } from "./Card";
import { UpgradeChefAction } from "./Action";
import { PositionType } from "./Enums";

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

    archiveOperation(op){
        w_game.update(game => {
            game.operations_closed.push(op);
            game.operations_in_progress = game.operations_in_progress.filter(ope => ope.title != op.title);
            return game;
        });
    }


    endOperation(title){
        w_game.update(game => {
            let op = game.findOperationInProgress(title);
            if(op){
                op.end();
                let crews = op.means_on_site.getUpdatableCrewmans();
                crews.forEach(crew => {
                    game.deck.push(new InformationCard(
                        crew.id,
                        "nouveau chef",
                        "Après de longues années d'altruisme, "+crew.name+" monte en grade",
                        0,
                        PositionType.BRIEF,
                        [new UpgradeChefAction(crew)]
                    ))
                });
                game.archiveOperation(op);

            }
            return game;
        });
    }
}