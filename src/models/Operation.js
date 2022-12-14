import { Ressource } from "./Ressource";
import { InterventionCard } from "./Card";

export class Operation{
    constructor(title,popularity_gain = 0,history = [],ressource = new Ressource()){
        this.title = title;
        this.popularity_gain = popularity_gain;
        this.history = history;
        this.means_on_site = ressource;
    }

    /**
     * @brief Ajoute une intervention dans une opération ainsi que ses moyens.
     * @param {Card} card 
     */
    addIntervention(card){
        this.history.push(card);
        this.means_on_site.addRessources(card.means_move);
    }

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

    addExperienceToCrewmans(){
        const listExp = this.getListExperience();
        this.means_on_site.crewmans.forEach(crewman => {
            //add random experience from listExp
            crewman.addExperience(listExp[Math.floor(Math.random() * listExp.length)])
        });
    }

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


    getPopularity(){
        return this.popularity_gain;
    }
}