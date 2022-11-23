import { Ressource } from "./Ressource";
import { Crewman } from "./FireFighter";
import { InterventionCard } from "./Card";

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
            new Crewman(1,'Thomas',40,50),
            new Crewman(2,'Pierre',80,20),
            new Crewman(3,'Amandine',60,90)
        ]);
        //TODO: call game_service to initialize ressource
    }

    //TODO: swipe_card function
}