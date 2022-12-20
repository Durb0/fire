import { newId, w_idTruck } from "../utils/store";
import { StateRessource } from "./Enums";

export class Truck{
    /**
     * 
     * @param {String} name Nom du camion
     * @param {number} nb_seat_min Nombre de place minimum
     * @param {number} nb_seat_max Nombre de place maximum
     * @param {Array<Category>} categories Liste des catégories du camion
     */
    constructor(name,nb_seat_min,nb_seat_max, categories = []){
        this.id = newId(w_idTruck);
        this.name = name;
        this.wear = 100;
        this.nb_seat_min = nb_seat_min;
        this.nb_seat_max = nb_seat_max;
        this.categories = categories;
        this.state = StateRessource.AVAILABLE;
        //image
    }
}