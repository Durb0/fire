import { InterventionCard, InformationCard, DilemmeCard } from "../models/Card"
import socket from '../utils/socket.js';
import {sleep} from '../utils/time.js';
import {w_game} from '../utils/store';

/**
 * @brief action lorsque le joueur reçoit une carte de dilemme
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
 * @brief action lorsque le joueur reçoit une carte d'information
 */
socket.on('InformationCard',async (data) => {
    var card = new InformationCard(
        data.id,
        data.name,
        data.description,
        data.time_before_trigger,
        data.position,
        undefined //TODO: action 
    );
    //await sleep(card.time_before_trigger);
    w_game.update((game) => {
        game.deck.push(card);
        return game;
    });
})

/**
 * @brief action lorsque le joueur reçoit une carte d'intervention
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
 * 
 * @param {int} cardId l'id de la carte d'avant 
 * @param {RelationLevel} level le niveau de la relation
 */
function callNextCard(cardId, level){
    socket.emit('drawNextCard', cardId, level);
}

/**
 * @brief fonction temporaire qui appelle 5 cartes d'intervention
 * @comment cette fonction est appelée par le constructeur de Game
 */
async function test(){
        socket.emit('drawInterventionBaseCard');
        socket.emit('drawInterventionBaseCard');
        socket.emit('drawInterventionBaseCard');
}

export {test, callNextCard};