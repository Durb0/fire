import { newIdFireFighter } from '../utils/store';
import { categories} from '../utils/globals';
import { getName } from '../services/name_service.js';

export class FireFighter{

    constructor(name = undefined, moral = 100, fatigue = 100){
        this.id = newIdFireFighter(); //TODO: generate id by service/store 
        this.moral = moral;
        this.fatigue = fatigue;
        this.name = name;
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
        var list = [];
        var number = Math.floor(Math.random() * 5);
        for(var i = 0; i < number; i++){
            var rand = Math.floor(Math.random() * categories.length);
            list.push(categories[rand]);
        }
        return list;
    }
}

export class Chef extends FireFighter{
    constructor(name = undefined, moral = 100, fatigue = 100, speciality = null, power = 0){
        super(name, moral, fatigue);
        this.speciality = speciality;
        this.power = power;
    }
}