export class FireFighter{

    constructor(id, name, moral = 100, fatigue = 100){
        this.id = id; //TODO: generate id by service/store 
        this.name = name;
        this.moral = moral;
        this.fatigue = fatigue;
    }
}

export class Crewman extends FireFighter{
    constructor(id, name, moral = 100, fatigue = 100, experience = []){
        super(id, name, moral, fatigue);
        this.experience = experience;
    }
}

export class Chef extends FireFighter{
    constructor(id, name, moral = 100, fatigue = 100, speciality = null, power = 0){
        super(id, name, moral, fatigue);
        this.speciality = speciality;
        this.power = power;
    }
}