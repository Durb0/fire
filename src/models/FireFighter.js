export class FireFighter{

    constructor(id, name, moral, fatigue){
        this.id = id; //TODO: generate id by service/store 
        this.name = name;
        this.moral = moral;
        this.fatigue = fatigue;
    }
}

export class Crewman extends FireFighter{
    constructor(id, name, moral, fatigue, experience){
        super(id, name, moral, fatigue);
        this.experience = experience;
    }
}

export class Chef extends FireFighter{
    constructor(id, name, moral, fatigue, speciality, power){
        super(id, name, moral, fatigue);
        this.speciality = speciality;
        this.power = power;
    }
}