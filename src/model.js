export class Game{
    constructor(){
        this.days = 0.0;
        this.reputation = 50;
        this.cards = [];
        this.stock = new Stock();
        
        this.generateCards(10);
    }

    //
    generateCards(nbCards){
        for(let i = 0; i < nbCards; i++){
            this.cards.push(new Card(i));
        }
    }
}

export class Stock{
    constructor(){
        this.trucks = [];
        this.chefs = [];
        this.firefighters = [];
    }
}

export class Truck{
    constructor(){
        this.name = "";
        this.capacity = 0;
        this.bonus = [];
    }
}

export class Firefighter{
    constructor(){
        this.name = "";
        this.bonus = [];
        this.level = 0;
        this.force = 0;
    }
}

export class Chef extends Firefighter{
    constructor(bonus){
        super();
        this.speciality = bonus;
    }
}

export class Bonus{
    constructor(name = "", value = 0){
        this.name = name;
        this.value = value;
    }
}

export class Card{
    constructor(title){
        this.title = title;
    }
}

