import { Ressource } from "./Ressource";
import { newId, w_idCard } from "../utils/store";
import { Operation } from "./Operation";
import { PositionType, RelationLevel, StateRessource } from "./Enums";
import { VALUE_BONUS_CHEF, VALUE_BONUS_FIREFIGHTER } from "../utils/globals.js";
import { callNextCard } from "../services/card_service.js";

export class Card {
    constructor(id, title, description, time_before_trigger, position) {
        this.entry_id = newId(w_idCard);
        this.id = id
        this.title = title;
        this.description = description;
        this.time_before_trigger = time_before_trigger;
        this.position = position;
    }


    swipeCard(game,direction){
        console.log("swipe_card");
        game.removeFirstCard();
    }
}


export class InterventionCard extends Card{

    constructor(id, title, description, time_before_trigger, position, 
        ratio_success, ratio_critical_success, ratio_critical_failure, ratio_critical_refusal, 
        categories = [], means_move = new Ressource())
    {
        super(id, title, description, time_before_trigger, position);
        this.ratio_success = ratio_success;
        this.ratio_critical_success = ratio_critical_success;
        this.ratio_critical_failure = ratio_critical_failure;
        this.ratio_critical_refusal = ratio_critical_refusal;
        this.categories = categories;
        this.means_move = means_move;
    }


    /**
     * @brief Gestion du swipe d'une carte d'intervention
     * @param {Game} game Données de la partie courante
     * @param {String} direction Informe la direction du swipe (Gauche|Droite). 
     */
    swipeCard(game,direction){
        console.log("=> swipe_card InterventionCard");

        switch ( this.position ) {
            case PositionType.BASE :
                console.log("Première carte de l'opération.");
                game.addOperationInProgress(this.startOperation(game));
                break;
            case PositionType.MID :
                console.log("En cours d'opération.");
                game.addOperationInProgress(this.supportOperation(game));
                break;
            case PositionType.END || PositionType.BRIEF :
                console.warn("Les cartes interventions ne peuvent pas être de type 'END' ou 'BRIEF'.");
                break;
            default :
                console.error("Error - InterventionCard - swipeCard()");
        }
        game.ressource.switchStates(StateRessource.SELECTED,StateRessource.UNAVAILABLE);
        game.removeFirstCard(); //Retire la première carte du Deck.
    }

    /**
     * @brief Gestion de la première carte intervention d'une opération.
     * @param {Game} game 
     * @returns Operation
     */
    startOperation(game){

        var my_op = new Operation(this.title,undefined,[this],this.means_move);
        
        if ( this.means_move.isEmpty() ) { // Refus d'intervention
            console.log("Refus d'intervention.");
            var rand = Math.floor(Math.random() * 100);
            if ( rand < this.ratio_critical_refusal ) {
                console.log("Critical refusal.");
                my_op.popularity_gain += RelationLevel.CRITICAL_REFUSAL;
                callNextCard( this.id, RelationLevel.CRITICAL_REFUSAL );
            } else {
                console.log("Simple refusal.");
                my_op.popularity_gain += RelationLevel.REFUSAL;
                callNextCard( this.id, RelationLevel.REFUSAL );
            }
        } else {
            console.log("Moyens envoyés sur intervention.")
            var relation = this.calculResult( my_op );
            my_op.popularity_gain += relation;
            console.log("Valeur de la relation next_card : " + relation);
            callNextCard( this.id , relation );
        }

        return my_op;
    }

    /**
     * @brief Traitement d'une carte d'intervention d'une opération en cours.
     * @param {Game} game 
     * @returns Operation
     */
    supportOperation(game){
        var my_op = game.findOperationInProgress(this.title);
        my_op.addIntervention(this);

        console.log("Moyens envoyés sur intervention.")
        var relation = this.calculResult( my_op );
        my_op.popularity_gain += relation;
        console.log("Valeur de la relation next_card : " + relation);
        return my_op;
    }

    /**
     * @brief Calcul le type de relation avec la carte suivante.
     * @param {Operation} my_op 
     * @returns RelationLevel
     */
    calculResult(my_op){

        var my_ratio_success = this.ratio_success;
        var my_ratio_critical_success = this.ratio_critical_success;
        var my_ratio_critical_failure = this.ratio_critical_failure;

        // calcul des effets sur critical_failure
        var categoriesTrucksOp = my_op.means_on_site.getCategoriesOfTrucks();
        if ( this.checkAllCategories(categoriesTrucksOp) ) {
            console.log("Les bonus des véhicules correspondent à la carte : Pas d'échec critique.")
            my_ratio_critical_failure = 0;
            
            // calcul des effets sur C_success
            if(my_op.means_on_site.chefs != null){
                console.log("Bonus de chef sur la réussite critique.")
                
                my_op.means_on_site.chefs.forEach(chef => {
                    if(categoriesTrucksOp.includes(chef.speciality) && this.categories.includes(chef.speciality)){
                        my_ratio_critical_success += chef.power * VALUE_BONUS_CHEF;
                    } 
                });                	
            } else {
                console.log("Pas de bonus de Chefs sur la réussite critique.");
            }

            // calcul des effets sur success
            var min_seat = my_op.means_on_site.countMinSeatInTrucks();
            var nb_firefighters = my_op.means_on_site.countFirefighters();
            console.log("Nombre de pompier en bonus : " + (nb_firefighters - min_seat) + ".");
            my_ratio_success +=(nb_firefighters - min_seat) * VALUE_BONUS_FIREFIGHTER ;
            
        } else {
            console.log("Les moyens ne correspondent pas à la carte : Pas de succès critique.");
            my_ratio_critical_success = 0;
        }

        //nombres aléatoires appliqués aux ratios modifiés.
        var rand_success = Math.floor(Math.random() * 100);
        var rand_critical = Math.floor(Math.random() * 100);

        if(rand_success < my_ratio_success){
            if(rand_critical < my_ratio_critical_success){
                return RelationLevel.CRITICAL_SUCCESS;
            } else {
                return RelationLevel.SUCCESS;
            }
        } else {
            if(rand_critical < my_ratio_critical_failure){
                return RelationLevel.CRITICAL_FAILURE;
            } else {
                return RelationLevel.FAILURE;
            }
        }
    }

    /**
     * @brief Check que les categories de la carte correspondent à la liste passée en paramètre.
     * @param {Category[]} categoriesTrucksOp 
     * @returns boolean
     */
    checkAllCategories(categoriesTrucksOp){
        for ( var category of this.categories) {
            if (!categoriesTrucksOp.includes(category)) {
                return false;
            }
        }
        return true;
    }

}


export class InformationCard extends Card{

    constructor(id, title, description, time_before_trigger, position, actions){
        super(id, title, description, time_before_trigger, position);
        this.actions = actions;
    }

    swipeCard(game,direction){
        switch(this.position){
            case PositionType.END:
                game.returnRessourcesOfOperation(this.title);
        }
        game.removeFirstCard();
    }
}

export class DilemmeCard extends Card{
    
    constructor(id, title, description, time_before_trigger, position, actions_left,actions_right){
        super(id, title, description, time_before_trigger, position);
        this.actions_left = actions_left;
        this.actions_right = actions_right;
    }

    swipeCard(game,direction){
        console.log("TODO : swipe_card DilemmeCard");
        game.removeFirstCard();
    }
}