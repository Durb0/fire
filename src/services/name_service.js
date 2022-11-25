import { names } from '../data/names';

//get random name
export function getName(){
    var rand = Math.floor(Math.random() * names.length);
    return names[rand];
}