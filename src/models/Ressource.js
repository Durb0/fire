import {Chef , Crewman} from './FireFighter';
import { StateRessource } from './Enums';

/**
 * Classe représentant les ressources de la partie
 */
export class Ressource{

    /**
     * 
     * @param {Array<Chef>} chefs Liste des chefs
     * @param {Array<Crewman>} crewmans Liste des équipiers
     * @param {Array<Truck>} trucks Liste des camions
     */
    constructor(chefs = [], crewmans = [], trucks = []){
        this.chefs = chefs;
        this.crewmans = crewmans;
        this.trucks = trucks;
    }

    /**
     * Ajoute un pompier à la liste des ressources
     * 
     * @param {FireFighter} fireFighter Le pompier à ajouter
     */
    addFireFighter(fireFighter){
        if(fireFighter instanceof Chef){
            this.chefs.push(fireFighter);
        }else if(fireFighter instanceof Crewman){
            this.crewmans.push(fireFighter);
        }
    }

    /**
     * 
     * @param {FireFighter} fireFighter Le pompier à supprimer
     */
    removeFireFighter(fireFighter){
        if(fireFighter instanceof Chef){
            this.chefs = this.chefs.filter(chef => chef.id != fireFighter.id);
        }else if(fireFighter instanceof Crewman){
            this.crewmans = this.crewmans.filter(crewman => crewman.id != fireFighter.id);
        }
    }

    /**
     * 
     * @param {Truck} truck Le camion à ajouter
     */
    addTruck(truck){
        this.trucks.push(truck);
    }

    /**
     * 
     * @param {Truck} truck Le camion à supprimer
     */
    removeTruck(truck){
        this.trucks = this.trucks.filter(el => el.id != truck.id);
    }

    /**
     * 
     * @returns {boolean} true si la liste des ressources est vide
     */
    isEmpty(){
        return (this.chefs.length == 0 && this.crewmans.length == 0 && this.trucks.length == 0);
    }

    /**
     * 
     * @returns {boolean} true si la liste des ressources est valide pour une intervention
     */
    isValideForIntervention(){
        var nb_seat_min = 0;
        this.trucks.forEach(truck => nb_seat_min += truck.nb_seat_min);
        return (nb_seat_min <= this.chefs.length + this.crewmans.length);
    }

    /**
     * 
     * @returns {number} le nombre de place max dans les camions
     */
    getSizeMaxOfTrucks(){
        var size_max = 0;
        this.trucks.forEach(truck => size_max += truck.nb_seat_max);
        return size_max;
    }

    /**
     * 
     * @returns {number} le nombre de pompier dans les ressources
     */
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

    /**
     * 
     * @returns {Array<Category>} la liste des catégories des camions
     */
    getCategoriesOfTrucks(){
        var categoriesTrucks = []
        this.trucks.forEach(truck => categoriesTrucks = categoriesTrucks.concat(truck.categories));
        return categoriesTrucks;
    }

    /**
     * 
     * @param {String} type Type de ressource (truck ou chef)
     * @returns {Array<Object>} la liste des catégories des ressources avec le nombre de ressources de chaque catégorie
     */
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

    /**
     * 
     * @param {StateRessource} from Etat de départ
     * @param {StateRessource} to Etat d'arrivée
     */
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

    /**
     * 
     * @returns {number} le nombre de place minimum dans les camions
     */
    countMinSeatInTrucks(){
        var min_seat = 0;
        this.trucks.forEach(truck => {
            min_seat += truck.nb_seat_min;
        })
        return min_seat;
    }

    /**
     * 
     * @returns {Array<Crewman>} la liste des pompiers pouvant être promus
     */
    getUpdatableCrewmans(){
        return this.crewmans.filter(crewman => crewman.canUpdateToChef() );
    }

    /**
     * Ajoute tous les élements de la ressource passée en paramètre dans une autre.
     * 
     * @param {Ressource} means 
     */
    addRessources(means){
        means.trucks.forEach(truck => {this.trucks.push(truck)});
        means.chefs.forEach(chef => {this.chefs.push(chef)});
        means.crewmans.forEach(crewman => {this.crewmans.push(crewman)});
    }

    /**
     * 
     * @returns {number} le ratio entre le nombre de place minimum dans les camions et le nombre de place maximum dans les camions
     */
    ratioSeatsMinMax(){
        let min_seats = this.countMinSeatInTrucks();
        let max_seats = this.getSizeMaxOfTrucks();

        return (max_seats == 0 ? 0 : min_seats*100/max_seats); 
    }

    /**
     * 
     * @returns {number} le ratio entre le nombre de place sélectionnées dans les camions et le nombre de place maximum dans les camions
     */
    ratioSeatsSelectedMax(){
        let selected_seats = this.countFirefighters();
        let max_seats = this.getSizeMaxOfTrucks();

        return (max_seats == 0 ? 0 : selected_seats*100/max_seats); 
    }

    /**
     * Modifie le moral de tous les pompiers valables de notre ressource
     * 
     * @param {integer} nbMoral 
     */
    updateMoralOfFirefightersAvailable(nbMoral){
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
     * Met à 100% le moral des sapeurs pompiers de la ressources.
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