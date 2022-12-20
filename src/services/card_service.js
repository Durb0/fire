import { InterventionCard, InformationCard, DilemmeCard } from "../models/Card"
import socket from '../utils/socket.js';
import {sleep} from '../utils/time.js';
import {w_game} from '../utils/store';
import { TitleInformationCard } from "../models/Enums";

/**
 * Action lorsque le joueur reçoit une carte de dilemme
 */
socket.on('DilemmeCard', async (data) => {
    var card = new DilemmeCard(
        data.id,
        data.name,
        data.description,
        data.time_before_trigger,
        data.position,
        undefined, //TODO: action_left
        undefined //TODO: action_right
    );
    await sleep(card.time_before_trigger);
    w_game.update(game => {
        game.deck.push(card);
        return game;
    }
    );
})

/**
 * Action lorsque le joueur reçoit une carte d'information
 */
socket.on('InformationCard',async (data) => {
    var card = new InformationCard(
        data.id,
        data.title,
        data.description,
        data.time_before_trigger,
        data.position,
        []//TODO: action 
    );
    //await sleep(card.time_before_trigger);
    w_game.update((game) => {
        game.deck.push(card);
        return game;
    });
})

/**
 * Action lorsque le joueur reçoit une carte d'intervention
 */
socket.on('InterventionCard',async (data) => {
    var card = new InterventionCard(
        data.id,
        data.title,
        data.description,
        data.time_before_trigger,
        data.position,
        data.ratio_success,
        data.ratio_critical_success,
        data.ratio_critical_failure,
        data.ratio_critical_refusal,
        data.categories,
        data.means_move
    );
    await sleep(card.time_before_trigger);
    w_game.update(game => {
        game.deck.push(card);
        return game;
    });
    }
);


/**
 * Fonction qui appelle la carte suivante en fonction de la carte d'avant et du niveau de la relation
 * 
 * @param {int} cardId l'id de la carte d'avant 
 * @param {RelationLevel} level le niveau de la relation
 */
function callNextCard(cardId, level){
    socket.emit('drawNextCard', cardId, level);
}

/**
 * Fonction qui appelle une carte d'intervention de base
 * 
 */
async function callInterventionBaseCard(blackList = []){
        socket.emit('drawInterventionBaseCard',blackList);
}

/**
 * Fonction qui appelle une carte information dont le titre correspond à la demande.
 * 
 * @param {TitleInformationCard} title titre de la carte cherché  
 */
async function callInformationCard(title){
    socket.emit('drawInformationCard',title);
}

export {callInterventionBaseCard, callNextCard, callInformationCard};