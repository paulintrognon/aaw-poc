'use strict';

const playersService = require('../services/playersService');

let io = null;
const sockets = {};

module.exports = {
  init,
  informPlayersOfPlayerMovement,
};

function init(newIo) {
  io = newIo;
  io.on('connection', function(socket) {
    socket.on('PLAYER_SPAWN', userId => {
      const player = playersService.findPlayer(userId);
      if (!player) {
        return;
      }
      sockets[player.id] = socket.id;
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

  const informedPlayers = {};
  oldPlayersInSight.forEach(player => {
    const isInNew = newPlayersInSight.some(newPlayer => {
      return newPlayer.id === player.id;
    });
    if (isInNew) {
      getPlayerSocket(player).emit('PLAYER_HAS_MOVED', {
        oldCoordinates: oldPlayer.coordinates,
        newCoordinates: newPlayer.coordinates,
      });
    } else {
      getPlayerSocket(player).emit('PLAYER_HAS_DISAPPEARED', {
        coordinates: oldPlayer.coordinates,
      });
    }
    informedPlayers[player.id] = true;
  });
  newPlayersInSight.forEach(player => {
    if (informedPlayers[player.id]) {
      return;
    }
    getPlayerSocket(player).emit('PLAYER_HAS_APPEARED', {
      coordinates: newPlayer.coordinates,
    });
  });
}

function getPlayerSocket(player) {
  return io.to(sockets[player.id]);
}
