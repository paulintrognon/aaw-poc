'use strict';

const playersService = require('../services/playersService');

let io = null;
const sockets = [

];

module.exports = {
  init,
  informPlayersOfPlayerMovement,
  informPlayersOfPlayerAttacking,
  informPlayerOfDamageTaken,
};

function init(newIo) {
  io = newIo;
  io.on('connection', function(socket) {
    socket.on('PLAYER_SPAWN', userId => {
      const player = playersService.findPlayer(userId);
      if (!player) {
        return;
      }
      sockets.push({
        id: socket.id,
        playerId: player.id,
      });
      console.log(`User ${userId} connected`, sockets);
    });
    socket.on('disconnect', function() {
      console.log('user disconnected');
    });
  });
}

function informPlayersOfPlayerMovement(oldPlayer, newPlayer) {
  const oldPlayersInSight = playersService.getAllPlayersInSightOfPlayer(oldPlayer);
  const newPlayersInSight = playersService.getAllPlayersInSightOfPlayer(newPlayer);
  const allPlayers = oldPlayersInSight.concat(newPlayersInSight);

  const informedPlayers = {};

  allPlayers.forEach(player => {
    if (informedPlayers[player.id]) {
      return;
    }
    const payload = {};
    if (newPlayer.id === player.id) {
      payload.isMe = true;
      payload.coordinates = newPlayer.coordinates;
    }
    emitToPlayer(player, 'REFRESH_BOARD', payload);
    informedPlayers[player.id] = true;
  });
}

function informPlayersOfPlayerAttacking(playerAttacking) {
  const allPlayers = playersService.getAllPlayersInSightOfPlayer(playerAttacking);
  const informedPlayers = {};

  allPlayers.forEach(player => {
    if (informedPlayers[player.id]) {
      return;
    }
    if (player.id === playerAttacking.id) {
      return;
    }
    emitToPlayer(player, 'PLAYER_ATTACKING', playerAttacking.id);
    informedPlayers[player.id] = true;
  });
}

function informPlayerOfDamageTaken(player, damages) {
  emitToPlayer(player, 'DAMAGES_TAKEN', damages);
}

function emitToPlayer(player, type, payload) {
  sockets.forEach(socket => {
    if (socket.playerId === player.id) {
      io.to(socket.id).emit(type, payload);
    }
  });
}
