import { Ressource } from "./Ressource";
import { newId, w_idCard } from "../utils/store";
import { Operation } from "./Operation";
import { PositionType, RelationLevel, StateRessource } from "./Enums";
import { VALUE_BONUS_CHEF, VALUE_BONUS_FIREFIGHTER } from "../utils/globals.js";
import { callNextCard } from "../services/card_service.js";
import { Action } from "./Action";

/**
 * Les cartes sont les éléments principaux du jeu, elles sont représentées par des objets de type Card.
 */

/**
 * Classe de base des cartes
 */
export class Card {

    /**
     * 
     * @param {number} id Identifiant de la cate
     * @param {String} title Titre de la carte
     * @param {String} description Description de la carte
     * @param {number} time_before_trigger Temps avant que la cartne ne soit déclenchée
     * @param {PositionType} position Position de la carte dans l'opération
     */
    constructor(id, title, description, time_before_trigger, position) {
        this.entry_id = newId(w_idCard);
        this.id = id
        this.title = title;
        this.description = description;
        this.time_before_trigger = time_before_trigger;
        this.position = position;
    }

    /**
     * action effectuée lors du swipe d'une carte
     * 
     * @param {Game} game 
     * @param {String} direction 
     */
    swipeCard(game,direction){
        console.log("swipe_card");
        game.removeFirstCard();
    }
}

/**
 * Les cartes d'interventions sont des cartes qui déclenchent une opération.
 */
export class InterventionCard extends Card{

    /**
     * 
     * @param {number} id Identifiant de la carte
     * @param {String} title Titre de la carte
     * @param {String} description Description de la carte
     * @param {number} time_before_trigger Temps avant que la carte ne soit déclenchée
     * @param {PositionType} position Position de la carte dans l'opération
     * @param {number} ratio_success Ratio de succès de l'opération
     * @param {number} ratio_critical_success Ratio de succès critique de l'opération
     * @param {number} ratio_critical_failure Ratio d'échec critique de l'opération
     * @param {number} ratio_critical_refusal Ratio de refus critique de l'opération
     * @param {Array} categories Catégories de l'opération
     * @param {Ressource} means_move Ressource nécessaire pour déplacer les pompiers
     */
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
     * Gestion du swipe d'une carte d'intervention
     * @param {Game} game Données de la partie courante
     * @param {String} direction Informe la direction du swipe (Gauche|Droite). 
     */
    swipeCard(game,direction){
        /**
         * Pas optimisé, il aurait fallut utiliser un pattern etat pour la position de la carte au lieu d'un simple enumérateur
         * Avec un pattern etat, on aurait pu faire une méthode pour chaque état et appeler la bonne méthode en fonction de la position de la carte.
         */
        switch ( this.position ) {
            case PositionType.BASE :
                game.addOperationInProgress(this.startOperation());
                break;
            case PositionType.MID :
                game.addOperationInProgress(this.supportOperation(game));
                break;
            case PositionType.END || PositionType.BRIEF :
                break;
            default :
                console.error("Error - InterventionCard - swipeCard()");
        }
        // On passe la carte en état "selected" puis "unavailable"
        game.ressource.switchStates(StateRessource.SELECTED,StateRessource.UNAVAILABLE);
        // Suppression de la carte
        game.removeFirstCard();
    }

    /**
     * Declenchement d'une opération
     * 
     * @param {Game} game 
     * @returns {Operation} Operation
     */
    startOperation(){

        var my_op = new Operation(this.title,undefined,[this],this.means_move);
        
        // On vérifie si les moyens sont disponibles
        if ( this.means_move.isEmpty() ) {
            var rand = Math.floor(Math.random() * 100);
            if ( rand < this.ratio_critical_refusal ) {
                my_op.popularity_gain += RelationLevel.CRITICAL_REFUSAL;
                callNextCard( this.id, RelationLevel.CRITICAL_REFUSAL );
            } else {
                my_op.popularity_gain += RelationLevel.REFUSAL;
                callNextCard( this.id, RelationLevel.REFUSAL );
            }
        } else {
            var relation = this.calculResult( my_op );
            my_op.popularity_gain += relation;
            callNextCard( this.id , relation );
        }

        return my_op;
    }

    /**
     * Traitement d'une carte d'intervention d'une opération en cours.
     * 
     * @param {Game} game 
     * @returns {Operation} Operation
     */
    supportOperation(game){
        var my_op = game.findOperationInProgress(this.title);
        my_op.addIntervention(this);

        var relation = this.calculResult( my_op );
        my_op.popularity_gain += relation;
        callNextCard( this.id , relation );
        return my_op;
    }

    /**
     * Calcul le type de relation avec la carte suivante.
     * 
     * @param {Operation} my_op 
     * @returns {RelationLevel} RelationLevel
     */
    calculResult(my_op){

        var my_ratio_success = this.ratio_success;
        var my_ratio_critical_success = this.ratio_critical_success;
        var my_ratio_critical_failure = this.ratio_critical_failure;

        // calcul des effets sur critical_failure
        var categoriesTrucksOp = my_op.means_on_site.getCategoriesOfTrucks();
        console.log("categories de l'intervention", this.categories)
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
            console.log("bruh")
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
     * Check que les categories de la carte correspondent à la liste passée en paramètre.
     * 
     * @param {Category[]} categoriesTrucksOp 
     * @returns {boolean} true si les categories correspondent, false sinon.
     */
    checkAllCategories(categoriesTrucksOp){
        this.categories.forEach(category => {
            if(!(categoriesTrucksOp.includes(category))){
                return false;
            }
        })
        return true;
    }

}

/**
 * Une carte d'information est une carte qui affiche une information au joueur.
 * Une carte d'information peut executer une ou plusieurs actions.
 */
export class InformationCard extends Card{

    /**
     * 
     * @param {number} id L'identifiant de la carte
     * @param {String} title Le titre de la carte
     * @param {String} description La description de la carte
     * @param {number} time_before_trigger Le temps avant que la carte ne soit jouée
     * @param {PositionType} position La position de la carte
     * @param {Action[]} actions Les actions à executer
     */
    constructor(id, title, description, time_before_trigger, position, actions){
        super(id, title, description, time_before_trigger, position);
        this.actions = actions;
    }

    /**
     * 
     * @param {Game} game Le jeu en cours
     * @param {String} direction La direction du swipe
     */
    swipeCard(game,direction){
        switch ( this.position ) {
            case PositionType.END :
                game.endOperation(this.title);
                this.doActions();
                game.removeFirstCard();
                break;
            case PositionType.BRIEF :
                this.doActions();
                game.removeFirstCard();
                break;
            default :
                console.error("Error - InformationCard - swipeCard() : la position de la carte n'est pas correcte ou prise en compte pour le moment.");
        }
    }

    /**
     * Execute toutes les actions de la carte.
     */
    doActions(){
        this.actions.forEach(action=>{
            action.do();
        });
    }
}

/**
 * La carte dilemme permet au joueur de choisir entre les actions de gauches ou les actions de droite
 * 
 * NOTE: Il n'existe pas encore de carte dilemme dans le jeu.
 */
export class DilemmeCard extends Card{
    
    /**
     * 
     * @param {number} id L'identifiant de la carte
     * @param {String} title Le titre de la carte
     * @param {String} description La description de la carte
     * @param {number} time_before_trigger Le temps avant que la carte ne soit jouée
     * @param {PositionType} position La position de la carte
     * @param {Action[]} actions_left Les actions à executer si le joueur choisi la gauche
     * @param {Action[]} actions_right Les actions à executer si le joueur choisi la droite
     */
    constructor(id, title, description, time_before_trigger, position, actions_left,actions_right){
        super(id, title, description, time_before_trigger, position);
        this.actions_left = actions_left;
        this.actions_right = actions_right;
    }

    /**
     * 
     * @param {Game} game Le jeu en cours
     * @param {String} direction La direction du swipe
     */
    swipeCard(game,direction){
        console.log("TODO : swipe_card DilemmeCard");
        game.removeFirstCard();
    }
}