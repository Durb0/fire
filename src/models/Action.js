import {w_game} from "../utils/store"
import { Chef } from "./FireFighter"



export class Action{
    constructor(){
    }

    do(){
        console.log("do action");
    }
}

export class UpgradeChefAction extends Action{
    constructor(crewman){
        super();
        this.crewman = crewman;
    }

    do(){
        let chef = new Chef();
        chef.updateCrewman(this.crewman);
        w_game.update((value) => {
            //remove crewman from ressource
            value.ressource.crewmans = value.ressource.crewmans.filter((crewman) => {
                return crewman.name != this.crewman.name;
            }
            );
            //add chef to ressource
            value.ressource.chefs.push(chef);
            return value;
        });
    }
}

export class OutFirefighterAction extends Action{
    constructor(firefighter){
        super();
        this.firefighter = firefighter;
    }

    do(){
        w_game.update((value) => {
            //remove firefighter from ressource
            value.ressource.crewmans = value.ressource.crewmans.filter((firefighter) => {
                return firefighter.id != this.firefighter.id;
            }
            );
            value.ressource.chefs = value.ressource.chefs.filter((firefighter) => {
                return firefighter.id != this.firefighter.id;
            }
            );
            return value;
        });
    }
}

export class AddRessourceAction extends Action{
    constructor(ressource){
        super();
        this.ressource = ressource;
    }

    do(){
        console.log("TOTO : do RessourceAction");
    }
}


export class PopularityAction extends Action{
    constructor(value){
        super();
        this.value = value;
    }

    do(){
        console.log("TOTO : do PopularityAction");
    }
}

export class FireFighterStatsAction extends Action{
    constructor(moral, fatigue, firefighter){
        super();
        this.moral = moral;
        this.fatigue = fatigue;
        this.firefighter = firefighter;
    }

    do(){
        console.log("TOTO : do FireFighterStatsAction");
    }
}