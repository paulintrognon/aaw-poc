'use strict';

const _ = require('lodash');
const bluebird = require('bluebird');

const playersService = require('../services/playersService');
const gameService = require('../services/gameService');
const boardService = require('../services/boardService');
const actions = require('../actions');

module.exports = {
  moveOwnPlayer,
  playerAttack,
};

function moveOwnPlayer(req, res) {
  const coordinates = req.body.coordinates;
  if (!coordinates) {
    return bluebird.reject({
      status: 400,
      name: 'coordinates-missing',
      message: 'Cannot move player : missing `coordinates` property',
    });
  }

  const player = findPlayer(req.playerId, 'Cannot move own player : not found');
  gameService.movePlayerToCoordinates(player, coordinates);
  const board = boardService.getPlayerBoard(player);
  return {
    board,
    player: player.getPrivateProperties(),
  };
}

// ---------------------

function playerAttack(req, res) {
  const player = findPlayer(req.playerId, 'Cannot attack : own player not found');
  const enemy = findPlayer(req.body.enemyId, 'Cannot attack : enemy player not found');
  return gameService.attack(player, enemy);
}

// ---------------------

function findPlayer(playerId, message) {
  const player = playersService.findPlayer(playerId);
  if (!player) {
    return bluebird.reject({
      message,
      status: 400,
      name: 'player-not-found',
    });
  }
  return player;
}
