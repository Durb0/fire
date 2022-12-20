import { newId, w_idFireFighter, w_game} from '../utils/store';
import { categories } from '../utils/globals';
import { getName } from '../services/name_service.js';
import { StateRessource, TitleInformationCard } from './Enums';
import { InformationCard } from './Card';
import { PositionType } from './Enums';
import { OutFirefighterAction } from './Action';


/**
 * Classe représentant un pompier
 */
export class FireFighter{

    /**
     * 
     * @param {String} name Le nom du pompier
     * @param {number} moral Le moral du pompier
     * @param {number} fatigue La fatigue du pompier
     */
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
     * Demande une carte de départ du pompier.
     */
    outFirefighter(){ }

    /**
     * additionne un nombre au moral du pompier. Gestion des erreurs et appel une carte pompier si le moral tombe à 0.  
     * 
     * @param {integer} nbMoral 
     */
    updateMoral(nb_moral){
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

/**
 * Un équipier est un pompier qui peut être affecté à une opération
 */
export class Crewman extends FireFighter{

    /**
     * 
     * @param {String} name Le nom de l'équipier
     * @param {number} moral Le moral de l'équipier
     * @param {number} fatigue La fatiguqe de l'équipier
     * @param {Category[]} experience La liste des catégories d'expérience de l'équipier
     */
    constructor(name = undefined, moral = 100, fatigue = 100, experience = []){
        super(name, moral, fatigue);
        this.experience = this.testExperience();
    }

    /**
     * Demande une carte de départ de l'équipier.
     */
    outFirefighter(){
        this.state = StateRessource.UNAVAILABLE;
        w_game.update(game => {
            game.deck.push(new InformationCard(
                0,
                "Départ d'un equipier",
                "Après de beau moment partagé, "+this.name+" se retire de son poste",
                0,
                PositionType.BRIEF,
                [new OutFirefighterAction(this)]
            ));
            return game;
        })
    }

    /**
     * @returns {Category[]} Une liste de catégorie d'expérience aléatoire
     */
    testExperience(){
        var list = [];
        var nb = Math.floor(Math.random() * 5);
        for (var i = 0; i < nb; i++){
            list.push(getRandomCategory());
        }
        return list;
    }

    /**
     * @returns {Category[]} La liste des catégories d'expérience de l'équipier sous forme de dictionnaire 
     */
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

    /**
     * @returns {Category} La catégorie d'expérience la plus représentée dans la liste des catégories d'expérience de l'équipier
     */
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

    /**
     * 
     * @returns {boolean} Vrai si l'équipier peut devenir chef
     */
    canUpdateToChef(){
        return this.experience.length >= 5;
    }

    /**
     * Ajoute une catégorie d'expérience à l'équipier
     * 
     * @param {Category} category L'experience à ajouter à l'équipier
     */
    addExperience(category){
        this.experience.push(category);
    }
}

/**
 * Un chef est un pompier qui peut être affecté à une opération
 */
export class Chef extends FireFighter{

    /**
     * 
     * @param {String} name Le nom du chef
     * @param {number} moral Le moral du chef
     * @param {number} fatigue La fatigue du chef
     * @param {Category} speciality La spécialité du chef
     * @param {number} power La puissance du chef sur la spécialité
     */
    constructor(name = undefined, moral = 100, fatigue = 100, speciality = getRandomCategory(), power = Math.floor(Math.random() * 5 + 1)){
        super(name, moral, fatigue);
        this.speciality = speciality;
        this.power = power;
    }

    /**
     * Demande une carte de départ du chef.
     */
    outFirefighter(){
        this.state = StateRessource.UNAVAILABLE;
        w_game.update(game => {
            game.deck.push(new InformationCard(
                0,
                "Départ d'un chef",
                "Après de longue année de sacrifice, "+this.name+" fait le choix de quitter la caserne",
                0,
                PositionType.BRIEF,
                [new OutFirefighterAction(this)]
            ));
            return game;
            }
            );
    }
    

    /**
     * Met à jour les informations du chef
     * 
     * @param {Crewman} crewman 
     */
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

/**
 * 
 * @returns {Category} Une catégorie aléatoire qui est une catégorie de gain
 */
function getRandomCategory(){
    const categs = categories.filter(categ => categ.is_gain == 1);
    return categs[Math.floor(Math.random() * categs.length)];
}