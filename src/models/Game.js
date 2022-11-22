import { Ressource } from "./Ressource";

export class Game{

    constructor(){
        this.deck = [];
        this.popularity = 100;
        this.operations_in_progress = [];
        this.operations_closed = [];
        this.ressource = new Ressource();
        //TODO: call game_service to initialize ressource
    }

    //TODO: swipe_card function
}