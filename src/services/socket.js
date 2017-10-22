import openSocket from 'socket.io-client';

let socket;

export default {
  socket,
  open,
};

function open(player) {
  socket = openSocket('http://localhost:3001');
  socket.emit('PLAYER_SPAWN', player.id);
}
