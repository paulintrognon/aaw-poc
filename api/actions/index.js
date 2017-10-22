'use strict';

const playersService = require('../services/playersService');

module.exports = init;

function init(io) {
  io.on('connection', function(socket) {
    socket.on('PLAYER_SPAWN', userId => {
      const player = playersService.findPlayer(userId);
      if (!player) {
        return;
      }
      player.loadSocket(socket);
      console.log(`User ${userId} connected`);
    });
  });
}
