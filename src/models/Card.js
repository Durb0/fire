import { Ressource } from "./Ressource";
import { newIdCard } from "../utils/store";
import { Operation } from "./Operation";
import { PositionType, RelationLevel } from "./Enums";

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
        ratio_success, ratio_critic_success, ratio_critic_failure, ratio_critic_refusal, 
        categories = [], means_move = new Ressource())
    {
        super(title, description, time_before_trigger, position);
        this.ratio_success = ratio_success;
        this.ratio_critic_success = ratio_critic_success;
        this.ratio_critic_failure = ratio_critic_failure;
        this.ratio_critic_refusal = ratio_critic_refusal;
        this.categories = categories;
        this.means_move = means_move;
    }


    // action swipe d'une carte intervention dans le deck
    swipeCard(game,direction){
        console.log("TODO : swipe_card InterventionCard");

        switch ( this.position ) {
            case PositionType.BASE :
                this.startOperation(game);
                break;
            case PositionType.MID :
                //supportOperation(my_game, my_card);
                break;
            case PositionType.END :
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
            var rand = Math.floor(Math.random() * 100);
            console.log("random value for ratio_refusal = " + rand);
            if ( rand < this.ratio_critic_refusal ) {
                console.log("Critical refusal");
                my_op.popularity_gain += RelationLevel.CRITICAL_REFUSAL;
                console.log("my_op.popularity = " + my_op.popularity_gain);
                //nextCard( my_card, RelationLevel.CRITICAL_REFUSAL ); //TODO: nextCard in the BDD
            } else {
                console.log("Simple refusal");
                my_op.popularity_gain += RelationLevel.REFUSAL;
                console.log("my_op.popularity = " + my_op.popularity_gain);
                //next_card( my_card, RelationLevel.REFUSAL ); //TODO: nextCard in the BDD
            }
        } else {
            //nextCard( my_card, calculResult( my_op, my_card ) );
        }
    }

    //return la relation de la carte suivante en fonction des ratios et des moyens envoyés dans l'opération.
    /*calculResult(my_op){

	ratio_success = this.ratio_success;
	ratio_critical_success = this.ratio_critic_success;
	ratio_critical_failure = this.ratio_critic_failure;

	// calcul des effets sur critical_failure
	categoriesTruckOp = getCategoriesOfTrucks(my_op.means_on_site.truck);
	if ( ### checkAllCategories(my_card.categories, categoriesTruckOp) ) {
		ratio_C_failure = 0;

		// calcul des effets sur C_success
		foreach(chef in my_op.means_on_site.chefs){
			if ( ### checkOneCategory(categoriesTruckOp, chef.speciality) ) {
				ratio_C_success = ### addRatio(ratio_C_success, chef.power);
			}
		}	  	

		// calcul des effets sur success
		foreach(truck in my_op.means_on_site.truck){
			min_seat += truck.nb_seat_min;
		}

	}*/

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