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

    addTruck(truck){
        this.trucks.push(truck);
        console.log("add truck",this);
    }
    removeTruck(truck){
        this.trucks = this.trucks.filter(el => el.id != truck.id);
        console.log("remove truck",this);
    }

    isEmpty(){
        return (this.chefs.length == 0 && this.crewmans.length == 0 && this.trucks.length == 0);
    }

    isValideForIntervention(){
        var nb_seat_min = 0;
        this.trucks.forEach(truck => nb_seat_min += truck.nb_seat_min);
        console.log("nb_seat_min",nb_seat_min);
        return (nb_seat_min <= this.chefs.length + this.crewmans.length);
    }

    getSizeMaxOfTrucks(){
        var size_max = 0;
        this.trucks.forEach(truck => size_max += truck.nb_seat_max);
        console.log("size_max_trucks",size_max);
        return size_max;
    }

    countFireFighters(){
        var len = this.chefs.length + this.crewmans.length;
        console.log("len_fireFighter",len);
        return len;
    }
    /**
     * 
     * @returns un booleen qui dit si le nombre de pompier est égal au nombre max de place dans les camions
     */
    isFull(){
        return (this.countFireFighters() == this.getSizeMaxOfTrucks());
    }
    getCategoriesOfTrucks(){
        var categoriesTrucks = []
        this.trucks.forEach(truck => categoriesTrucks = categoriesTrucks.concat(truck.categories));
        return categoriesTrucks;
    }
    getNumbersOfCategoriesOfTrucks(){
        var categoriesTrucks = [];
        var catFound;
        var newCat;
        this.trucks.forEach(truck => {
            truck.categories.forEach(cat => {
                catFound = categoriesTrucks.findIndex(el => el.category.name == cat.name);
               // console.log(catFound)
                //console.log(categoriesTrucks)
                if(catFound == -1){
                    newCat = new Object();
                    newCat = {category:cat,number:1};
                    categoriesTrucks.push(newCat);
                } else {
                   // console.log("avant",categoriesTrucks[catFound].number);
                    //console.log("catFound" ,catFound);
                    categoriesTrucks[catFound].number += 1; 
                   // console.log("apres",categoriesTrucks[catFound].number);
                }
            })
        })
        return categoriesTrucks;
    }

    countMinSeatInTrucks(){
        var min_seat = 0;
        this.trucks.forEach(truck => {
            min_seat += truck.nb_seat_min;
        })
        return min_seat;
    }

    /**
     * @brief Ajoute tous les élements de la ressource passée en paramètre dans une autre.
     * @param {Ressource} means 
     */
    addRessources(means){
        means.trucks.forEach(truck => {this.trucks.push(truck)});
        means.chefs.forEach(chef => {this.chefs.push(chef)});
        means.crewmans.forEach(crewman => {this.crewmans.push(crewman)});
    }
}