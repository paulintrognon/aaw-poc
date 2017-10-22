'use strict';

const _ = require('lodash');
const bluebird = require('bluebird');

const gameService = require('../services/gameService');
const playersService = require('../services/playersService');
const tokenService = require('../services/tokenService');

module.exports = {
  createPlayer,
  fetchPlayer,
};

function createPlayer(req, res) {
  const name = req.body.name;
  if (!name) {
    return bluebird.reject({
      status: 400,
      name: 'name-missing',
      message: 'Cannot create player : missing `name` property',
    });
  }

  const player = playersService.createPlayer({ name });
  gameService.spawnPlayer(player);

  const token = tokenService.create(player);

  return {
    token,
    player: player.getPrivateProperties(),
  };
}

function fetchPlayer(req, res) {
  const player = playersService.findPlayer(req.playerId);
  if (!player) {
    return bluebird.reject({
      status: 404,
      name: 'player-not-found',
      message: 'Cannot fetch player : player not found',
    });
  }

  return {
    player: player.getPrivateProperties(),
  };
}
