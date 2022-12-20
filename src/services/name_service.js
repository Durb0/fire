import { names } from '../data/names';

/**
 * 
 * @returns {string} Un nom aléatoire
 */
export function getName(){
    var rand = Math.floor(Math.random() * names.length);
    return names[rand];
}