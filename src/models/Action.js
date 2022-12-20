import {w_game} from "../utils/store"
import { Chef } from "./FireFighter"

/**
 * Les Actions sont des évènements qui se produisent dans le jeu
 * 
 * Une carte peut déclencher une ou plusieurs actions
 * Actuellement toute les actions ne sont pas implémentées
 */


/**
 * Classe abstraite Action qui définit une action lors d'un évènement
 */
class Action{
    constructor(){
    }

    /**
     * Action à effectuer
     */
    do(){
        console.log("do action");
    }
}

/**
 * Action qui met à jour un pompier vers chef
 */
class UpgradeChefAction extends Action{

    /**
     * 
     * @param {Crewman} crewman  le pompier à mettre à jour
     */
    constructor(crewman){
        super();
        this.crewman = crewman;
    }

    /**
     * met à jour le pompier en chef
     */
    do(){
        // On crée une nouvelle instance de chef
        let chef = new Chef();
        // On met à jour les propriétés du chef avec celles du pompier
        chef.updateCrewman(this.crewman);
        // On met à jour le store
        w_game.update((value) => {
            // enlève le pompier de la liste des pompiers
            value.ressource.crewmans = value.ressource.crewmans.filter((crewman) => {
                return crewman.name != this.crewman.name;
            }
            );
            //ajoute le chef à la liste des chefs
            value.ressource.chefs.push(chef);
            return value;
        });
    }
}

/**
 * Action qui sort un pompier du jeu
 */
class OutFirefighterAction extends Action{

    /**
     * 
     * @param {FireFighter} firefighter le pompier à sortir du jeu
     */
    constructor(firefighter){
        super();
        this.firefighter = firefighter;
    }

    /**
     * sort le pompier du jeu
     */
    do(){
        // On met à jour le store
        w_game.update(game => {
            // enlève le pompier de la liste des pompiers
            game.ressource.crewmans = game.ressource.crewmans.filter((firefighter) => {
                console.log("firefighter.id",firefighter.id);
                return firefighter.id != this.firefighter.id;
            }
            );
            // enlève le pompier de la liste des chefs
            game.ressource.chefs = game.ressource.chefs.filter((firefighter) => {
                return firefighter.id != this.firefighter.id;
            }
            );
            // retourne le nouvel état du store
            return game;
        });
    }
}

/**
 * Action qui ajoute une ressource au jeu
 */
class AddRessourceAction extends Action{

    /**
     * 
     * @param {Ressource} ressource La ressource à ajouter
     */
    constructor(ressource){
        super();
        this.ressource = ressource;
    }

    /**
     * ajoute une ressource au jeu
     * 
     * TODO: Faire la methode
     */
    do(){
        console.log("TOTO : do RessourceAction");
    }
}

/**
 * Action qui met à jour la popularité
 */
class PopularityAction extends Action{

    /**
     * 
     * @param {number} value 
     */
    constructor(value){
        super();
        this.value = value;
    }

    /**
     * met à jour la popularité
     * 
     * TODO: Faire la methode
     */
    do(){
        console.log("TOTO : do PopularityAction");
    }
}


/**
 * Action qui met à jour les statistiques d'un pompier
 */
class FireFighterStatsAction extends Action{

    /**
     * 
     * @param {number} moral 
     * @param {number} fatigue 
     * @param {FireFighter} firefighter 
     */
    constructor(moral, fatigue, firefighter){
        super();
        this.moral = moral;
        this.fatigue = fatigue;
        this.firefighter = firefighter;
    }
    /**
     * met à jour les statistiques d'un pompier
     * 
     * TODO: Faire la methode
     */
    do(){
        console.log("TOTO : do FireFighterStatsAction");
    }
}

export { Action, UpgradeChefAction, OutFirefighterAction, AddRessourceAction, PopularityAction, FireFighterStatsAction};