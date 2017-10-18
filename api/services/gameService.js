'use strict';

const boardService = require('./boardService');

module.exports = gameServiceFactory();

function gameServiceFactory() {
  const gameService = {};

  gameService.init = init;
  gameService.spawnPlayer = spawnPlayer;

  return gameService;

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
}
