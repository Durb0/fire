import { Ressource } from "./Ressource";
import { w_game } from "../utils/store";
import { getOptions } from "../services/game_service";
import { callInterventionBaseCard } from "../services/card_service";
import { InformationCard, InterventionCard } from "./Card";
import { UpgradeChefAction } from "./Action";
import { PositionType } from "./Enums";
import { sleep } from "../utils/time";
import { Crewman } from "./FireFighter";

/**
 * Classe représentant une partie
 */
export class Game{

    constructor(){
        this.deck = [];
        this.popularity = 50;
        this.operations_in_progress = [];
        this.operations_closed = [];
        this.ressource = new Ressource();
    }

    /**
     * Début d'une partie
     */
    start(){
            getOptions();
            callInterventionBaseCard(this.getBlackList()); //première carte
            this.luckToDrawNewOperation(50);
            this.updateMoralFirefighter(-1);
    }

    /**
     * Pioche une nouveau carte en fonction d'un taux de chance dans le temps
     * 
     * @param {number} luck pourcentage de chance de piocher une nouvelle carte
     */
    async luckToDrawNewOperation(luck){
        while(this.popularity>0){
            
            if(Math.floor(Math.random() * 100) <= luck){
                callInterventionBaseCard(this.getBlackList());
            }
            w_game.update(game => game = this);
            await sleep(1);
        }
    }

    /**
     * 
     * @returns {Array} liste des titres des cartes en cours et en base
     */
    getBlackList(){
        let blackList = [];
        this.operations_in_progress.forEach(op => blackList.push(op.title));
        this.deck.forEach(card =>{
            if(card.position == PositionType.BASE && card instanceof InterventionCard){
                blackList.push(card.title);
            }
        });
        return blackList;
    }

    /**
     * Modifie le morale de tout les pompiers du joueur qui se trouve en caserne dans le temps 
     * 
     * @param {integer} nb_moral taux de moral à modifier
     */
    async updateMoralFirefighter(nb_moral){
        while(this.popularity>0){
            this.ressource.updateMoralOfFirefightersAvailable(nb_moral);
            w_game.update(game => game = this);
            await sleep(1);
        }
    }

    /**
     * Retire la première carte du Deck.
     */
    removeFirstCard(){
        w_game.update(game => {
            game.deck.shift();
            return game;
        });
    }

    /**
     * 
     * @returns {Card} la première carte du deck
     */
    firstCard(){
        if (this.deck.length > 0){
            return this.deck[0];
        }
        return null;
    }

    /**
     * Ajouter une opération dans les opérations en cours
     * 
     * @param {Operation} my_op 
     */
    addOperationInProgress(my_op){
        w_game.update(game => {
            game.operations_in_progress.push(my_op);
            return game;
        });
    }

    /**
     * Cherche l'opération en cours où le titre correspond au paramètre.
     * 
     * @param {String} title 
     * @returns {Operation} l'opération cherchée
     */
    findOperationInProgress(title){
        return this.operations_in_progress.find(op => op.title == title);
    }

    /**
     * Archive une opération dans les opérations finis
     * 
     * @param {Operation} op l'opération à archiver
     */
    archiveOperation(op){
        w_game.update(game => {
            game.operations_closed.push(op);
            game.operations_in_progress = game.operations_in_progress.filter(ope => ope.title != op.title);
            return game;
        });
    }


    /**
     * Termine une opération en cours
     * 
     * @param {String} title Le titre de l'opération
     */
    endOperation(title){
        w_game.update(game => {
            let op = game.findOperationInProgress(title);
            if(op){
                op.end();
                let crews = op.means_on_site.getUpdatableCrewmans();
                game.createCardsInformationsNewChef(crews);
                game.archiveOperation(op);
                op.means_on_site.maxMoralFirefighters();
                game.updatePopularity(op.getPopularity());
            }
            return game;
        });
    }

    /**
     * Modifie la popularité de la game.
     * 
     * @param {number} nb_popularity nombre de popularité a modifier
     */
    updatePopularity(nb_popularity){
        let my_pop = this.popularity + nb_popularity;
        if(my_pop <= 0){
            this.popularity = 0;
            this.endGame();
        } else if(my_pop > 100){
            this.popularity = 100;
        } else {
            this.popularity = my_pop;
        }
    }

    /**
     * 
     * @param {Array<Crewman>} crews 
     */
    createCardsInformationsNewChef(crews){
        crews.forEach(crew => {
            this.deck.push(new InformationCard(
                crew.id,
                "nouveau chef",
                "Après de longues années d'altruisme, "+crew.name+" monte en grade",
                0,
                PositionType.BRIEF,
                [new UpgradeChefAction(crew)]
            ))
        });
    }

    /**
     * Met fin au jeu
     */
    endGame(){
        window.location.href = window.location.origin;
        w_game.set(new Game());
    }
}