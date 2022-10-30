import {callNextCard, newId} from './card_service.js';


export class Game{
    constructor(){
        this.days = 0.0;
        this.reputation = 50;
        this.cards = [];
        this.stock = new Stock();
        this.generateStock(2,3,8);
    }

    generateCards(nbCards){
        for(let i = 0; i < nbCards; i++){
            this.cards.push(new Card(i));
        }
    }

    removeFirstCard(){
        function applyResult(card){
            //numero random entre 1 et 100
            var rand = Math.floor(Math.random() * 100) + 1;
            var result = "GOOD";
            if(rand >= card.difficulty){
                result = "GOOD";
            }else{
                result = "BAD";
            }
            return result;
        }

        const card = this.cards[0];
        this.cards.shift();
        if(card.position == "END"){
            return;
        }
        setTimeout(function(){
            var result = applyResult(card);
            callNextCard(card.id, result);
        },card.time);
    }
    generateStock(nbTrucks, nbChefs, nbFirefighters){
        this.stock.generateTrucks(nbTrucks);
        this.stock.generateChefs(nbChefs);
        this.stock.generateFirefighters(nbFirefighters);
    }
}

export class Stock{
    constructor(){
        this.trucks = [];
        this.chefs = [];
        this.firefighters = [];
    }

    //
    generateTrucks(nbTrucks){
        for(let i = 0; i < nbTrucks; i++){
            this.trucks.push(new Truck());
        }
    }

    //
    generateChefs(nbChefs){
        for(let i = 0; i < nbChefs; i++){
            this.chefs.push(new Chef());
        }
    }

    //
    generateFirefighters(nbFirefighters){
        for(let i = 0; i < nbFirefighters; i++){
            this.firefighters.push(new Firefighter("pp"+i.toString()));
        }
    }
}

export class Truck{
    constructor(name){
        this.name = "";
        this.capacity = 0;
        this.bonus = [];
    }
}

export class Firefighter{
    constructor(name){
        this.name = name;
        this.bonus = [];
        this.level = 0;
        this.force = 0;
    }
}

export class Chef extends Firefighter{
    constructor(bonus = null){
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
    constructor(id,title,description,position){
        this.entry_id = newId();
        this.id = id;
        this.title = title;
        this.description = description;
        this.position = position;
    }
}

export class InterventionCard extends Card{
    constructor(id,title,description,position,time,difficulty){
        super(id,title,description,position);
        this.time = time;
        this.difficulty = difficulty;
    }
}

export class InfoCard extends Card{
    constructor(id,title,description,position,gain_popularity){
        super(id,title,description,position);
        this.gain_popularity = gain_popularity;
    }
}
