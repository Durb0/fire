import {io} from 'socket.io-client';

const host = 'http://146.59.158.131';
const port = '5000';
export const url = `${host}:${port}`;



//const url = 'http://localhost:5000';

const socket = io(url);

export default socket;