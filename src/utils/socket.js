import {io} from 'socket.io-client';

/**
 * addresse du serveur
 */
const host = 'http://146.59.158.131';

/**
 * addresse du serveur en local pour les tests
 */
const lhost = 'http://localhost';

/**
 * port du serveur
 */
const port = '5000';

/**
 * url du serveur
 */
export const url = `${host}:${port}`;

/**
 * socket du serveur
 */
const socket = io(url);

export default socket;