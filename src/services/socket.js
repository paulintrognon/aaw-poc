import openSocket from 'socket.io-client';
import store from '../store';
import { fetchBoardAction } from '../actions/gameActions';

let socket;

export default {
  socket,
  open,
};

function open(player) {
  socket = openSocket('http://localhost:3001');
  socket.emit('PLAYER_SPAWN', player.id);

  socket.on('REFRESH_BOARD', payload => {
    store.dispatch(fetchBoardAction());
  });
}
