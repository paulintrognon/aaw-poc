'use strict';

const boardService = require('./boardService');

module.exports = gameServiceFactory();

function gameServiceFactory() {
  const gameService = {};

  gameService.init = init;

  return gameService;

  function init() {
    boardService.generateBoard(10, 10);
  }

  function spanPlayer(player) {
    const coordinates = boardService.getSpawnableCoordinates();
    movePlayerToCoordinates(player, coordinates);
  }

  function movePlayerToCoordinates(player, coordinates) {
    board.movePlayer(player, newCoordinates);
    player.coordinates = coordinates;
  }
}
