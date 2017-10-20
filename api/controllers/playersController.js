'use strict';

const _ = require('lodash');
const bluebird = require('bluebird');

const playersService = require('../services/playersService');
const gameService = require('../services/gameService');
const boardService = require('../services/boardService');

module.exports = {
  moveOwnPlayer,
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

  const player = playersService.findPlayer(req.playerId);
  if (!player) {
    return bluebird.reject({
      status: 400,
      name: 'player-not-fount',
      message: 'Cannot move player : player to move not found',
    });
  }

  gameService.movePlayerToCoordinates(player, coordinates)
  const board = boardService.getPlayerBoard(player);
  return {
    board,
    player,
  };
}
