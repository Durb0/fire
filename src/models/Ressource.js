import {Chef , Crewman} from './FireFighter';

export class Ressource{
    constructor(chefs = [], crewmans = [], trucks = []){
        this.chefs = chefs;
        this.crewmans = crewmans;
        this.trucks = trucks;
    }

    addFireFighter(fireFighter){
        if(fireFighter instanceof Chef){
            this.chefs.push(fireFighter);
        }else if(fireFighter instanceof Crewman){
            this.crewmans.push(fireFighter);
        }
        console.log("add fireFighter",this);
    }

    removeFireFighter(fireFighter){
        if(fireFighter instanceof Chef){
            this.chefs = this.chefs.filter(chef => chef.id != fireFighter.id);
        }else if(fireFighter instanceof Crewman){
            this.crewmans = this.crewmans.filter(crewman => crewman.id != fireFighter.id);
        }
        console.log("remove fireFighter",this);
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

    getSizeMaxOfTrucks(){
        var size_max = 0;
        this.trucks.forEach(truck => size_max += truck.nb_seat_max);
        console.log("size_max_trucks",size_max);
        return size_max;
    }

    getLenFireFighter(){
        var len = this.chefs.length + this.crewmans.length;
        console.log("len_fireFighter",len);
        return len;
    }

    isFull(){
        return (this.getLenFireFighter() == this.getSizeMaxOfTrucks());
    }
}