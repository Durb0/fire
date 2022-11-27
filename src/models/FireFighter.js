import { newIdFireFighter } from '../utils/store';
import { categories } from '../utils/globals';
import { getName } from '../services/name_service.js';
import { StateRessource } from './Enums';

export class FireFighter{

    constructor(name = undefined, moral = 100, fatigue = 100){
        this.id = newIdFireFighter(); //TODO: generate id by service/store 
        this.moral = moral;
        this.fatigue = fatigue;
        this.name = name;
        this.state = StateRessource.AVAILABLE;
        if (name == undefined){
            this.name = getName();
        }

    }
}

export class Crewman extends FireFighter{
    constructor(name = undefined, moral = 100, fatigue = 100, experience = []){
        super(name, moral, fatigue);
        this.experience = this.testExperience();
}

    testExperience(){
        //create a random list between 0 and 5 of OperationType
        //only categories with is_gain to 1
        var list = [];
        var nb = Math.floor(Math.random() * 5);
        for (var i = 0; i < nb; i++){
            list.push(getRandomCategory());
        }
        return list;
    }
}

export class Chef extends FireFighter{
    constructor(name = undefined, moral = 100, fatigue = 100, speciality = getRandomCategory(), power = Math.floor(Math.random() * 6 + 1)){
        super(name, moral, fatigue);
        this.speciality = speciality;
        this.power = power;
    }
}

function getRandomCategory(){
    const categs = categories.filter(categ => categ.is_gain == 1);
    return categs[Math.floor(Math.random() * categs.length)];
}