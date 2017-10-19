'use strict';

const crypto = require('crypto');

const players = [];

module.exports = {
  createPlayer,
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
