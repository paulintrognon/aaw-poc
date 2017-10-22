import openSocket from 'socket.io-client';

let socket;

export default {
  socket,
  open,
};

function open(player) {
  socket = openSocket('http://localhost:3001');
  socket.emit('PLAYER_SPAWN', player.id);
  console.log('test');

  socket.on('PLAYER_HAS_MOVED', () => {
    console.log('PLAYER_HAS_MOVED');
  });
  socket.on('PLAYER_HAS_DISAPPEARED', () => {
    console.log('PLAYER_HAS_DISAPPEARED');
  });
  socket.on('PLAYER_HAS_APPEARED', () => {
    console.log('PLAYER_HAS_APPEARED');
  });
}
