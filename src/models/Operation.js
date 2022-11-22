import { Ressource } from "./Ressource";

export class Operation{
    constructor(title,popularity_gain,history = [],ressource = new Ressource()){
        this.title = title;
        this.popularity_gain = popularity_gain;
        this.history = history;
        this.ressource = ressource;
    }
}