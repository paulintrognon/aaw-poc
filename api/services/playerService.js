'use strict';

const _ = require('lodash');
const crypto = require('crypto');

module.exports = {
  createPlayer,
};

function createPlayer(specs) {
  const player = {
    id: specs.id || generateId(),
    name: specs.name,
    health: specs.health || 100,
    coordinates: specs.coordinates,
  };

  return player;

  // ------------------------------------------------------

  function getPublicProperties() {
    return _.map(player, ['id', 'name', 'coordinates']);
  }
}

function generateId() {
  return crypto.randomBytes(2).toString('hex');
}
