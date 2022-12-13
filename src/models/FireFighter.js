import { newId, w_idFireFighter} from '../utils/store';
import { categories } from '../utils/globals';
import { getName } from '../services/name_service.js';
import { StateRessource, TitleInformationCard } from './Enums';
import { callInformationCard } from '../services/card_service.js';

export class FireFighter{

    constructor(name = undefined, moral = 100, fatigue = 100){
        this.id = newId(w_idFireFighter);
        this.moral = moral;
        this.fatigue = fatigue;
        this.name = name;
        this.state = StateRessource.AVAILABLE;
        if (name == undefined){
            this.name = getName();
        }

    }

    /**
     * @brief Demande une carte de départ du pompier.
     */
    outFirefighter(){ }

    /**
     * @brief additionne un nombre au moral du pompier. Gestion des erreurs et appel une carte pompier si le moral tombe à 0.  
     * @param {integer} nbMoral 
     */
    updateMoral(nb_moral){
        console.log("updateMoral");
        let my_moral = this.moral + nb_moral;
        if(my_moral <= 0){
            this.moral = 0;
            this.outFirefighter();   
        } else if(my_moral > 100){
            this.moral = 100;
        } else {
            this.moral = my_moral;
        }
    }
}

export class Crewman extends FireFighter{
    constructor(name = undefined, moral = 100, fatigue = 100, experience = []){
        super(name, moral, fatigue);
        this.experience = this.testExperience();
    }

    outFirefighter(){
        callInformationCard(TitleInformationCard.DEPART_CHEF);
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

    expToListOfDict(){
        var list = [];
        this.experience.forEach(exp => {
            for(var i = 0; i < list.length; i++){
                if (list[i].category == exp){
                    list[i].nb++;
                    return;
                }
            }
            list.push({category: exp, nb: 1});
        });
        console.log("list of categories of firefighter",list);
        return list;
    }

    getBestExperience(){
        return this.expToListOfDict().sort((a, b) => {
            if (a.nb > b.nb){
                return -1;
            }
            if (a.nb < b.nb){
                return 1;
            }
            return 0;
        })[0];
    }

    canUpdateToChef(){
        return this.experience.length >= 5;
    }

    addExperience(category){
        this.experience.push(category);
    }
}

export class Chef extends FireFighter{
    constructor(name = undefined, moral = 100, fatigue = 100, speciality = getRandomCategory(), power = Math.floor(Math.random() * 5 + 1)){
        super(name, moral, fatigue);
        this.speciality = speciality;
        this.power = power;
    }

    outFirefighter(){
        callInformationCard(TitleInformationCard.DEPART_EQUIPIER);
    }
    

    updateCrewman(crewman){
        this.id = crewman.id;
        this.name = crewman.name;
        this.moral = crewman.moral;
        this.fatigue = crewman.fatigue;
        this.state = crewman.state;
        let power = crewman.getBestExperience();
        this.speciality = power.category;
        this.power = power.nb;
    }
}

function getRandomCategory(){
    const categs = categories.filter(categ => categ.is_gain == 1);
    return categs[Math.floor(Math.random() * categs.length)];
}