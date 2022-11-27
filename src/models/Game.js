import { Ressource } from "./Ressource";
import { Chef, Crewman } from "./FireFighter";
import { InformationCard, InterventionCard } from "./Card";
import { Action } from "./Action";
import { w_game } from "../utils/store";
import { Truck } from "./Truck";
import { PositionType } from "./Enums";
import { getOptions } from "../services/game_service";

export class Game{

    constructor(){

        getOptions();

        let first_mean = new Ressource(
            [],
            [],
            [
                //new Truck(1,undefined,"VSAV", 3, 4),
                new Truck("VSAV", 2, 3),
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
        this.ressource = new Ressource();
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