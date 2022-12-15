import {Chef , Crewman} from './FireFighter';
import { StateRessource } from './Enums';

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
    }

    removeFireFighter(fireFighter){
        if(fireFighter instanceof Chef){
            this.chefs = this.chefs.filter(chef => chef.id != fireFighter.id);
        }else if(fireFighter instanceof Crewman){
            this.crewmans = this.crewmans.filter(crewman => crewman.id != fireFighter.id);
        }
    }

    addTruck(truck){
        this.trucks.push(truck);
    }
    removeTruck(truck){
        this.trucks = this.trucks.filter(el => el.id != truck.id);
    }

    isEmpty(){
        return (this.chefs.length == 0 && this.crewmans.length == 0 && this.trucks.length == 0);
    }

    isValideForIntervention(){
        var nb_seat_min = 0;
        this.trucks.forEach(truck => nb_seat_min += truck.nb_seat_min);
        return (nb_seat_min <= this.chefs.length + this.crewmans.length);
    }

    getSizeMaxOfTrucks(){
        var size_max = 0;
        this.trucks.forEach(truck => size_max += truck.nb_seat_max);
        return size_max;
    }

    countFirefighters(){
        var len = this.chefs.length + this.crewmans.length;
        return len;
    }
    /**
     * 
     * @returns un booleen qui dit si le nombre de pompier est égal au nombre max de place dans les camions
     */
    isFull(){
        return (this.countFirefighters() == this.getSizeMaxOfTrucks());
    }
    getCategoriesOfTrucks(){
        var categoriesTrucks = []
        this.trucks.forEach(truck => categoriesTrucks = categoriesTrucks.concat(truck.categories));
        return categoriesTrucks;
    }
    getNumbersOfCategories(type){
        var categoriesWithNumber = [];
        var catFound;
        var newCat;
        
        if(type=="truck"){
            this.trucks.forEach(truck => {
                truck.categories.forEach(cat => {
                    catFound = categoriesWithNumber.findIndex(el => el.category.name == cat.name);
                    if(catFound == -1){
                        newCat = new Object();
                        newCat = {category:cat,number:1};
                        categoriesWithNumber.push(newCat);
                    } else {
                        categoriesWithNumber[catFound].number += 1; 
                    }
                })
            })
        } else if (type=="chef"){
            this.chefs.forEach(chef => {
                catFound = categoriesWithNumber.findIndex(el => el.category.name == chef.speciality.name);
                if(catFound == -1){
                    newCat = new Object();
                    newCat = {category:chef.speciality,number:1};
                    categoriesWithNumber.push(newCat);
                } else {
                    categoriesWithNumber[catFound].number += 1; 
                }
            })
        } else {
            console.error("error - Ressource.js - getNumbersOfCategories(type) type is not correct");
        }
        
        return categoriesWithNumber;
    }

    switchStates(from,to){
        this.trucks.forEach(truck => {
            if(truck.state == from){
                truck.state = to;
            }
        });
        this.crewmans.forEach(fireFighter => {
            if(fireFighter.state == from){
                fireFighter.state = to;
            }
        });
        this.chefs.forEach(chef => {
            if(chef.state == from){
                chef.state = to;
            }
        });
    }

    countMinSeatInTrucks(){
        var min_seat = 0;
        this.trucks.forEach(truck => {
            min_seat += truck.nb_seat_min;
        })
        return min_seat;
    }

    getUpdatableCrewmans(){
        return this.crewmans.filter(crewman => crewman.canUpdateToChef() );
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

    ratioSeatsMinMax(){
        let min_seats = this.countMinSeatInTrucks();
        let max_seats = this.getSizeMaxOfTrucks();

        return (max_seats == 0 ? 0 : min_seats*100/max_seats); 
    }

    ratioSeatsSelectedMax(){
        let selected_seats = this.countFirefighters();
        let max_seats = this.getSizeMaxOfTrucks();

        return (max_seats == 0 ? 0 : selected_seats*100/max_seats); 
    }

    /**
     * @brief modifie le moral de tous les pompiers valables de notre ressource
     * @param {integer} nbMoral 
     */
    updateMoralOfFirefightersAvailable(nbMoral){
        console.log("updateMoralOfFirefightersAvailable");
        this.chefs.forEach(chef => {
            if(chef.state != StateRessource.UNAVAILABLE){
                chef.updateMoral(nbMoral);
            }
        });
        this.crewmans.forEach(crewman => {
            if(crewman.state != StateRessource.UNAVAILABLE){
                crewman.updateMoral(nbMoral);
            }
        });
    }

    /**
     * @brief Met à 100% le moral des sapeurs pompiers de la ressources.
     */
    maxMoralFirefighters(){
        this.chefs.forEach(chef => {
                chef.moral = 100;
        });
        this.crewmans.forEach(crewman => {
                crewman.moral = 100;
        });
    }
    
}