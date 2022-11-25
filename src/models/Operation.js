import { Ressource } from "./Ressource";

export class Operation{
    constructor(title,popularity_gain = 0,history = [],ressource = new Ressource()){
        this.title = title;
        this.popularity_gain = popularity_gain;
        this.history = history;
        this.means_on_site = ressource;
    }

}