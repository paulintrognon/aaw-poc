'use strict';

const boardService = require('./boardService');

module.exports = {
  init,
  spawnPlayer,
  movePlayerToCoordinates,
};

function init() {
  boardService.generateBoard(10, 10);
}

function spawnPlayer(player) {
  const coordinates = boardService.generateSpawnableCoordinates();
  movePlayerToCoordinates(player, coordinates);
}

function movePlayerToCoordinates(player, newCoordinates) {
  boardService.movePlayer(player, newCoordinates);
  player.coordinates = newCoordinates;
}
