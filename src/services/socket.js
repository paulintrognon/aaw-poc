import openSocket from 'socket.io-client';
import store from '../store';
import { fetchBoardAction, refreshPlayer } from '../actions/gameActions';

let socket;

export default {
  socket,
  open,
};

function open(player) {
  socket = openSocket('http://localhost:3001');
  socket.emit('PLAYER_SPAWN', player.id);

  socket.on('REFRESH_BOARD', payload => {
    // If we refresh because our own player moved, we check if the change has already been applied
    if (payload.isMe) {
      setTimeout(() => {
        const player = store.getState().game.player.player;
        if (player.coordinates.x !== payload.coordinates.x || player.coordinates.y !== payload.coordinates.y) {
          store.dispatch(refreshPlayer());
        }
      }, 1000);
    } else {
      store.dispatch(fetchBoardAction());
    }
  });
}
