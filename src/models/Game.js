import { Ressource } from "./Ressource";
import { Chef, Crewman } from "./FireFighter";
import { InformationCard, InterventionCard } from "./Card";
import { Action } from "./Action";
import { w_game } from "../utils/store";
import { Truck } from "./Truck";
import { PositionType } from "./Enums";
import { getCategory } from "../utils/globals";

export class Game{

    constructor(){
        
        
        let first_mean = new Ressource(
            [
                new Chef("Julienne", undefined, undefined, getCategory("PERSONNAL_ASSISTANCE"), 3)
            ],
            [
                new Crewman("Carole"),
                new Crewman("Afrodille")

            ],
            [
                new Truck(1,undefined,"VSAV", 3, 4,[getCategory("PERSONNAL_ASSISTANCE"), getCategory("SPEED")])
            ]
        );

        let second_mean = new Ressource(
            [
                new Chef("Dominique", undefined, undefined, getCategory("FIRE"), 2)
            ],
            [
                new Crewman("Octave"),
                new Crewman("Simon"),
                new Crewman("Fleurette"),
                new Crewman("Lucille"),
                new Crewman("Brice")
            ],
            [
                new Truck(2,undefined,"FPT",4,6,[getCategory("FIRE")])
            ]
        );


        this.deck = [
            new InterventionCard("First_Inter","Début de l'intervention",0, PositionType.BASE, 50, 30, 30, 10, [getCategory("PERSONNAL_ASSISTANCE"), getCategory("SPEED")], first_mean),
            new InterventionCard("First_Inter","Premier pas de l'intervention",0, PositionType.MID, 50, 30, 30, 10, [getCategory("FIRE")], second_mean),
            new InformationCard("Titre", "decription",0, "END", new Action())
        ];

        this.popularity = 100;
        this.operations_in_progress = [];
        this.operations_closed = [];
        this.ressource = new Ressource();
        //TODO: call game_service to initialize ressource
    }

    testpop(){
        this.popularity = 50;
        w_game.update(game => this);
    }

    /**
     * @brief Retire la première carte du Deck.
     */
    removeFirstCard(){
        this.deck.shift()
        w_game.update(game => this);
    }

    addOperationInProgress(my_op){
        this.operations_in_progress.push(my_op);
        w_game.update(game => this);
    }

    /**
     * @brief Cherche l'opération en cours où le titre correspond au paramètre.
     * @param {*} title 
     * @returns 
     */
    findOperationInProgress(title){
        return this.operations_in_progress.find(op => op.title == title);
    }

    //TODO: swipe_card function
}