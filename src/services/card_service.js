import { InterventionCard, InfoCard } from './model.js';
import socket from '../utils/socket.js';
import {sleep} from '../utils/time.js';
import { game } from '../main.js';
import { w_cards, w_id } from '../utils/store.js';



socket.on('InfoCard', function(jdata) {
    const data = JSON.parse(jdata);
    var card = new InfoCard(
        data.id,
        data.title,
        data.description,
        data.position,
        data.info.gain_popularity
    );
    game.cards.push(card);
    w_cards.update(cards => [...cards, card]);
    });

socket.on('InterventionCard',(jdata) => {
    const data = JSON.parse(jdata);
    var card = new InterventionCard(
        data.id,
        data.title,
        data.description,
        data.position,
        data.intervention.time,
        data.intervention.difficulty
    );
    //game.cards.push(card);
    game.cards.push(card);
    w_cards.update(cards => [...cards, card]);
    }
);

function callNextCard(cardId, level){
    socket.emit('drawNextCard', cardId, level);
}

async function test(){
    while(true){
        socket.emit('drawInterventionBaseCard');
        await sleep(10000);
    }
}

export {test, callNextCard, newId};