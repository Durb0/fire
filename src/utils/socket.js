import {io} from 'socket.io-client';

const url = 'http://146.59.158.131:5000';

//const url = 'http://localhost:5000';

const socket = io(url);

export default socket;