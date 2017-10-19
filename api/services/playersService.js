'use strict';

const _ = require('lodash');
const crypto = require('crypto');

const players = [];

module.exports = {
  createPlayer,
  findPlayer,
};

function createPlayer(information) {
  const player = {
    id: crypto.randomBytes(2).toString('hex'),
    name: information.name,
    health: 100,
  };
  players.push(player);
  return player;
}

function findPlayer(playerId) {
  return _.find(players, player => player.id === playerId);
}
