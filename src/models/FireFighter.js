import { newIdFireFighter } from '../utils/store';
import { OperationType } from './Enums';
import { getName } from '../services/name_service';

export class FireFighter{

    constructor(name = undefined, moral = 100, fatigue = 100){
        this.id = newIdFireFighter(); //TODO: generate id by service/store 
        this.moral = moral;
        this.fatigue = fatigue;
        this.name = name;
        if (name == undefined){
            console.log("name is undefined");
            this.defineName();
        }

    }

    async defineName(){
        await getName().then((name) => {
            this.name = name;
            console.log("name: " + this.name);
        }
    );
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
            var rand = Math.floor(Math.random() * Object.keys(OperationType).length);
            list.push(OperationType[Object.keys(OperationType)[rand]]);
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