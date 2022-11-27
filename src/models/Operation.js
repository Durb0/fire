import { Ressource } from "./Ressource";

export class Operation{
    constructor(title,popularity_gain = 0,history = [],ressource = new Ressource()){
        this.title = title;
        this.popularity_gain = popularity_gain;
        this.history = history;
        this.means_on_site = ressource;
    }

    /**
     * @brief Ajoute une intervention dans une opération ainsi que ses moyens.
     * @param {Card} card 
     */
    addIntervention(card){
        this.history.push(card);
        this.means_on_site.addRessources(card.means_move);
    }

}