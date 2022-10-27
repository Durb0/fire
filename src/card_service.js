import { InterventionCard } from './model.js';
import socket from './socket.js';
import {sleep} from './time.js';
import {initCards} from './func.js';
import { game } from './main.js';
import { w_cards, w_id } from './store.js';

socket.on('InfoCard', function(data) {
    console.log(data);
    });

socket.on('InterventionCard',(jdata) => {
    const data = JSON.parse(jdata);
    var id= 0;
    w_id.subscribe((value) => {
        id = value;
    });
    w_id.update((value) => value + 1);
    var card = new InterventionCard(
        id,
        data.title,
        data.description,
        data.position,
        data.intervention.type,
        data.intervention.time,
        data.intervention.difficulty,
        data.intervention.interval
    );
    //game.cards.push(card);
    game.cards.push(card);
    w_cards.update(cards => [...cards, card]);
    }
);


async function test(){
    while(true){
        socket.emit('drawInterventionBaseCard');
        await(sleep(5000));
        }
}

export {test};