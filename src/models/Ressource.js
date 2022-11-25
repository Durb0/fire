import { Crewman } from "./FireFighter";

export class Ressource{
    constructor(chefs = [], crewmans = [], trucks = []){
        this.chefs = chefs;
        this.crewmans = crewmans;
        this.trucks = trucks;
    }

    isEmpty(){
        return (this.chefs.length == 0 && this.crewmans.length == 0 && this.trucks.length == 0);
    }

    isValideForIntervention(){
        var nb_seat_min = 0;
        this.trucks.forEach(truck => nb_seat_min += truck.nb_seat_min);
        console.log("nb_min_seat = " + nb_seat_min);
        return (nb_seat_min <= this.chefs.length + this.crewmans.length);
    }

    getCategoriesOfTrucks(){
        var categoriesTrucks = []
        this.trucks.forEach(truck => categoriesTrucks = categoriesTrucks.concat(truck.categories));
        return categoriesTrucks;
    }

    countMinSeatInTrucks(){
        var min_seat = 0;
        this.trucks.forEach(truck => {
            min_seat += truck.nb_seat_min;
        })
        return min_seat;
    }

    countFirefighters(){
        var nb_firefighters = 0;
        this.chefs.forEach(chef => nb_firefighters += 1);
        this.crewmans.forEach(crewman => nb_firefighters += 1);
        return nb_firefighters;
    }
}