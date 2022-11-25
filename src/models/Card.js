import { Ressource } from "./Ressource";
import { newIdCard } from "../utils/store";
import { Operation } from "./Operation";
import { PositionType, RelationLevel } from "./Enums";
import { VALUE_BONUS_CHEF, VALUE_BONUS_FIREFIGHTER } from "../utils/globals.js";

export class Card {
    constructor(title, description, time_before_trigger, position) {
        this.entry_id = newIdCard();
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

    constructor(title, description, time_before_trigger, position, 
        ratio_success, ratio_critical_success, ratio_critical_failure, ratio_critical_refusal, 
        categories = [], means_move = new Ressource())
    {
        super(title, description, time_before_trigger, position);
        this.ratio_success = ratio_success;
        this.ratio_critical_success = ratio_critical_success;
        this.ratio_critical_failure = ratio_critical_failure;
        this.ratio_critical_refusal = ratio_critical_refusal;
        this.categories = categories;
        this.means_move = means_move;
    }


    // action swipe d'une carte intervention dans le deck
    swipeCard(game,direction){
        console.log("=> swipe_card InterventionCard");

        switch ( this.position ) {
            case PositionType.BASE :
                console.log("Première carte de l'opération.");
                this.startOperation(game);
                break;
            case PositionType.MID :
                console.log("En cours d'opération.");
                //supportOperation(my_game, my_card);
                break;
            case PositionType.END :
                console.log("Dernière carte de l'opération.");
                //finishOperation(my_game, my_card);
                break;
            default :
                console.log("Error - InterventionCard - swipeCard()");
        }
        game.removeFirstCard();
    }

    // initialisation du début d'une intervention
    startOperation(game){
        var my_op = new Operation(this.title,undefined,[this],this.means_move);

        if ( this.means_move.isEmpty() ) { // Refus d'intervention
            console.log("Refus d'intervention.");
            var rand = Math.floor(Math.random() * 100);
            if ( rand < this.ratio_critical_refusal ) {
                console.log("Critical refusal.");
                my_op.popularity_gain += RelationLevel.CRITICAL_REFUSAL;
                //nextCard( my_card, RelationLevel.CRITICAL_REFUSAL ); //TODO: nextCard in the BDD
            } else {
                console.log("Simple refusal.");
                my_op.popularity_gain += RelationLevel.REFUSAL;
                //next_card( my_card, RelationLevel.REFUSAL ); //TODO: nextCard in the BDD
            }
        } else {
            console.log("Moyens envoyés sur intervention.")
            console.log(this.calculResult( my_op ));
            //nextCard( my_card, this.calculResult( my_op ) ); //TODO: nextCard in the BDD
        }
    }

    //return la relation de la carte suivante en fonction des ratios et des moyens envoyés dans l'opération.
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
            console.log("Pas de bonus sur les ratios de l'intervention.");
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

    // revoir un boolean : Vrai si toutes les catégories de la carte sont représenté par les catégories passé en paramêtre sinon Faux.
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

    constructor(title, description, time_before_trigger, position, actions){
        super(title, description, time_before_trigger, position);
        this.actions = actions;
    }

    swipeCard(game,direction){
        console.log("TODO : swipe_card InformationCard");
        game.removeFirstCard();
    }
}

export class DilemmeCard extends Card{
    
    constructor(title, description, time_before_trigger, position, actions_left,actions_right){
        super(title, description, time_before_trigger, position);
        this.actions_left = actions_left;
        this.actions_right = actions_right;
    }

    swipeCard(game,direction){
        console.log("TODO : swipe_card DilemmeCard");
        game.removeFirstCard();
    }
}