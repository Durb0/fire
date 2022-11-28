import { InterventionCard, InfoCard } from "../models/Card"
import socket from '../utils/socket.js';
import {sleep} from '../utils/time.js';
import {w_game} from '../utils/store';




socket.on('InterventionCard',(data) => {
    var card = new InterventionCard(
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
    w_game.update(game => {
        game.deck.push(card);
        return game;
    });
    }
);

function callNextCard(cardId, level){
    socket.emit('drawNextCard', cardId, level);
}

async function test(){
    for (let i = 0; i < 5; i++) {
        socket.emit('drawInterventionBaseCard');
    }
}

export {test, callNextCard};