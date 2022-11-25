import { Ressource } from "./Ressource";
import { Chef, Crewman } from "./FireFighter";
import { InformationCard, InterventionCard } from "./Card";
import { Action } from "./Action";
import { w_game } from "../utils/store";
import { Truck } from "./Truck";
import { PositionType, OperationType } from "./Enums";

export class Game{

    constructor(){
        
        let first_mean = new Ressource(
            [
                new Chef("Julienne"),
                new Chef("Joséphine")
            ],
            [
                new Crewman("Carole"),
                new Crewman("Afrodille"),
                new Crewman("Roland"),
                new Crewman("Rosemarie"),
                new Crewman("Gabriel")
            ],
            [
                new Truck(1,undefined,"VSAV", 3, 4),
                new Truck(2,undefined,"FPT",4,6)
            ]
        );

        this.deck = [
            new InterventionCard("First_Inter","Description",0, PositionType.BASE, 50, 30, 30, 0, [OperationType.PERSONNAL_ASSISTANCE, OperationType.SPEED], first_mean),
            new InterventionCard("Seconde_Inter","Description",0, PositionType.BASE, 0, 0, 0, 40, []),
            new InformationCard("Titre", "decription",0, "END", new Action())
        ];

        this.popularity = 100;
        this.operations_in_progress = [];
        this.operations_closed = [];
        this.ressource = first_mean;
        //TODO: call game_service to initialize ressource
    }

    testpop(){
        this.popularity = 50;
        w_game.update(game => this);
    }

    removeFirstCard(){
        this.deck.shift()
        w_game.update(game => this);
    }

    //TODO: swipe_card function
}