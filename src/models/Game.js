import { Ressource } from "./Ressource";
import { Crewman } from "./FireFighter";
import { InterventionCard } from "./Card";
import { OperationType } from "./Enums";

export class Game{

    constructor(){
        this.deck = [
            //TODO: tu peux creer 3 cartes de test
            new InterventionCard("Titre", "decription")
        ];
        this.popularity = 100;
        this.operations_in_progress = [];
        this.operations_closed = [];
        this.ressource = new Ressource([],[
            new Crewman(),
            new Crewman(),
            new Crewman()
        ]);
        //TODO: call game_service to initialize ressource
    }

    //TODO: swipe_card function
}