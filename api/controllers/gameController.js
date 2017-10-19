'use strict';

const _ = require('lodash');
const bluebird = require('bluebird');

const gameService = require('../services/gameService');
const playersService = require('../services/playersService');

module.exports = {
  createPlayer,
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
  return { player };
}