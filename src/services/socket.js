import openSocket from 'socket.io-client';
import store from '../store';
import config from 'config';
import { fetchBoardAction, refreshPlayer, soldierIsAttacking } from '../actions/gameActions';

let socket;

export default {
  socket,
  open,
};

function open(player) {
  socket = openSocket(config.api.host);
  socket.emit('PLAYER_SPAWN', player.id);

  socket.on('REFRESH_BOARD', payload => {
    // If we refresh because our own player moved, we check if the change has already been applied
    if (payload.isMe) {
      setTimeout(() => {
        const player = store.getState().player.player;
        if (player.coordinates.x !== payload.coordinates.x || player.coordinates.y !== payload.coordinates.y) {
          store.dispatch(refreshPlayer());
        }
      }, 300);
    } else {
      store.dispatch(fetchBoardAction());
    }
  });

  socket.on('PLAYER_ATTACKING', payload => {
    console.log('PLAYER_ATTACKING')
    store.dispatch(soldierIsAttacking(payload));
  });
}
