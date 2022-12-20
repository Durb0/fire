import socket from "../utils/socket";
import { setCategories } from "../utils/globals";
import { Crewman, Chef } from "../models/FireFighter";
import { Truck } from "../models/Truck";

import { w_game } from "../utils/store";

/**
 * Action lorsque le joueur reçoit les options du jeu
 */
socket.on('Options', function(data) {
    setCategories(data.categories);
    createCrewmans(data.nbCrewMan);
    createChefs(data.nbChef);
    createTrucks(data.trucks);
});

/**
 * 
 * @param {number} nbCrewman Nombre d'équipier
 */
function createCrewmans(nbCrewman){
    var crewManList = [];
    for(var i = 0; i < nbCrewman; i++){
        crewManList.push(new Crewman());
    }
    w_game.update(game => { game.ressource.crewmans = crewManList; return game;});
}

/**
 * 
 * @param {number} nbChef Nombre de chef
 */
function createChefs(nbChef){
    var chefList = [];
    for(var i = 0; i < nbChef; i++){
        chefList.push(new Chef());
    }
    w_game.update(game => { game.ressource.chefs = chefList; return game;});
}

/**
 * 
 * @param {Array<Truck>} trucks Liste des camions
 */
function createTrucks(trucks){
    var trucksList = [];
    for(var i = 0; i < trucks.length; i++){
        trucksList.push(new Truck(trucks[i].name, trucks[i].nb_seat_min, trucks[i].nb_seat_max, trucks[i].categories));
    }
    w_game.update(game => { game.ressource.trucks = trucksList; return game;});
}

/**
 * Demande les options du jeu
 */
export function getOptions(){
    socket.emit('getOptions');
}