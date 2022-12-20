import { Ressource } from "./Ressource";
import { InterventionCard } from "./Card";

export class Operation{

    /**
     * 
     * @param {String} title Titre de l'opération
     * @param {number} popularity_gain Gain de popularité
     * @param {Array<Card>} history Historique des cartes jouées
     * @param {Ressource} ressource Ressources sur le site
     */
    constructor(title,popularity_gain = 0,history = [],ressource = new Ressource()){
        this.title = title;
        this.popularity_gain = popularity_gain;
        this.history = history;
        this.means_on_site = ressource;
    }

    /**
     * Ajoute une intervention dans une opération ainsi que ses moyens.
     * 
     * @param {Card} card 
     */
    addIntervention(card){
        this.history.push(card);
        this.means_on_site.addRessources(card.means_move);
    }

    /**
     * 
     * @returns {Array<Category>} liste des expériences des interventions
     */
    getListExperience(){
        var list = [];
        const histoInter = this.history.filter(card => card instanceof InterventionCard);
        histoInter.forEach(card => {
            card.categories.forEach(category => {
                list.push(category);
            });
        });
        return list;
    }

    /**
     * Ajoute une expérience aléatoire de l'operation à chaque équipier
     */
    addExperienceToCrewmans(){
        const listExp = this.getListExperience();
        this.means_on_site.crewmans.forEach(crewman => {
            //add random experience from listExp
            crewman.addExperience(listExp[Math.floor(Math.random() * listExp.length)])
        });
    }

    /**
     * Fin de l'opération
     */
    end(){
        this.means_on_site.crewmans.forEach(crewman => {
            crewman.state = "AVAILABLE";
        });
        this.means_on_site.chefs.forEach(chef => {
            chef.state = "AVAILABLE"
        });
        this.means_on_site.trucks.forEach(trucks => {
            trucks.state = "AVAILABLE"
        });
        this.addExperienceToCrewmans();
    }

    /**
     * 
     * @returns {number} Gain de popularité de l'opération
     */
    getPopularity(){
        return this.popularity_gain;
    }
}