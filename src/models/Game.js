import { Ressource } from "./Ressource";
import { Chef, Crewman } from "./FireFighter";
import { InformationCard, InterventionCard } from "./Card";
import { Action } from "./Action";
import { w_game } from "../utils/store";
import { Truck } from "./Truck";
import { PositionType } from "./Enums";

export class Game{

    constructor(){

        let first_mean = new Ressource(
            [
                new Chef(1,"Julienne"),
                new Chef(2,"Joséphine")
            ],
            [
                new Crewman(1,"Carole"),
                new Crewman(2,"Afrodille"),
                new Crewman(3,"Roland"),
                new Crewman(4,"Rosemarie"),
                new Crewman(5,"Gabriel")
            ],
            [
                new Truck(1,undefined,"VSAV", 3, 4),
                new Truck(2,undefined,"FPT",4,6)
            ]
        );

        this.deck = [
            new InterventionCard("First_Inter","Description",0, PositionType.BASE, 0, 0, 0, 0, [], first_mean),
            new InterventionCard("Seconde_Inter","Description",0, PositionType.BASE, 0, 0, 0, 40, []),
            new InformationCard("Titre", "decription",0, "END", new Action())
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

    removeFirstCard(){
        this.deck.shift()
        w_game.update(game => this);
    }

    //TODO: swipe_card function
}