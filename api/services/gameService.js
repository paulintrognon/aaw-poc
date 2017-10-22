'use strict';

const _ = require('lodash');
const boardService = require('./boardService');
const playersService = require('./playersService');
const actions = require('../actions');

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
  const oldPlayer = _.cloneDeep(player);

  boardService.movePlayer(player, newCoordinates);
  player.setCoordinates(newCoordinates);

  actions.informPlayersOfPlayerMovement(oldPlayer, player);
}
