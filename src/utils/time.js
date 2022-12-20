/**
 * 
 * @param {number} seconds Nombre de secondes à attendre
 * @returns {Promise} Une promesse qui se résoudra après le nombre de secondes spécifié
 */
const sleep = (seconds) => {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

export { sleep };