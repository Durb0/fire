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
        console.log("TOTO : do UpgradeChefAction");
    }
}

export class RessourceAction extends Action{
    constructor(type, ressource){
        super();
        this.type = type;
        this.ressource = ressource;
    }

    do(){
        console.log("TOTO : do RessourceAction");
    }
}

export class TruckStatsAction extends Action{
    constructor(truck, wear){
        super();
        this.truck = truck;
        this.wear = wear;
    }

    do(){
        console.log("TOTO : do TruckStatsAction");
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