import socket from "../utils/socket";
import { setCategories } from "../utils/globals";
import { Crewman, Chef } from "../models/FireFighter";
import { w_game } from "../utils/store";

socket.on('Options', function(data) {
    setCategories(data.categories);
    createCrewmans(data.nbCrewMan);
    createChefs(data.nbChef);
    createTrucks(data.trucks);
});


function createCrewmans(nbCrewman){
    var crewManList = [];
    for(var i = 0; i < nbCrewman; i++){
        crewManList.push(new Crewman());
    }
    w_game.update(game => { game.ressource.crewmans = crewManList; return game;});
}


function createChefs(nbChef){
    var chefList = [];
    for(var i = 0; i < nbChef; i++){
        chefList.push(new Chef());
    }
    w_game.update(game => { game.ressource.chefs = chefList; return game;});
}

function createTrucks(trucks){
    w_game.update(game => { game.ressource.trucks = trucks; return game;});
}


export function getOptions(){
    socket.emit('getOptions');
}