import { Ressource } from "./Ressource";
import { w_game } from "../utils/store";
import { getOptions } from "../services/game_service";
import { callInterventionBaseCard, c } from "../services/card_service";
import { InformationCard, InterventionCard } from "./Card";
import { UpgradeChefAction } from "./Action";
import { PositionType } from "./Enums";
import { sleep } from "../utils/time";

export class Game{

    constructor(){
        this.deck = [];
        this.popularity = 100;
        this.operations_in_progress = [];
        this.operations_closed = [];
        this.ressource = new Ressource();
    }

    /**
     * @brief départ d'une partie
     */
    start(){
            getOptions();
            callInterventionBaseCard(this.getBlackList()); //première carte
            this.luckToDrawNewOperation(10);
            this.updateMoralFirefighter(-1);
    }

    /**
     * @brief Pioche une nouveau carte en fonction d'un taux de chance dans le temps
     * 
     * @param {integer} luck pourcentage de chance de piocher une nouvelle carte
     * @param {integer} time temps d'attendre entre chaque essai de pioche
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
     * @brief modifie le morale de tout les pompiers du joueur qui se trouve en caserne dans le temps 
     * @param {integer} nb_moral taux de moral à modifier
     * @param {integer} time temps d'attente entre chaque modification
     */
    async updateMoralFirefighter(nb_moral){
        while(this.popularity>0){
            this.ressource.updateMoralOfFirefightersAvailable(nb_moral);
            w_game.update(game => game = this);
            await sleep(1);
        }
    }

    /**
     * @brief Retire la première carte du Deck.
     */
    removeFirstCard(){
        w_game.update(game => {
            game.deck.shift();
            return game;
        });
    }

    firstCard(){
        if (this.deck.length > 0){
            return this.deck[0];
        }
        return null;
    }

    addOperationInProgress(my_op){
        w_game.update(game => {
            game.operations_in_progress.push(my_op);
            return game;
        });
    }

    /**
     * @brief Cherche l'opération en cours où le titre correspond au paramètre.
     * @param {*} title 
     * @returns 
     */
    findOperationInProgress(title){
        return this.operations_in_progress.find(op => op.title == title);
    }

    archiveOperation(op){
        w_game.update(game => {
            game.operations_closed.push(op);
            game.operations_in_progress = game.operations_in_progress.filter(ope => ope.title != op.title);
            return game;
        });
    }


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
     * @brief modifie la popularité de la game.
     * @param {integer} nb_popularity nombre de popularité a modifier
     */
    updatePopularity(nb_popularity){
        let my_pop = this.popularity + nb_popularity;
        if(my_pop <= 0){
            this.popularity = 0;
            //TODO: Fin de la partie 
        } else if(my_pop > 100){
            this.popularity = 100;
        } else {
            this.popularity = my_pop;
        }
    }

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
}