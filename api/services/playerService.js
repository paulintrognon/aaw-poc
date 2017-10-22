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
    coordinates: specs.coordinates || {},
  };

  player.getPublicProperties = getPublicProperties;
  player.isOnBoard = isOnBoard;
  player.move = move;

  return player;

  // ------------------------------------------------------

  function getPublicProperties() {
    return _.map(player, ['id', 'name', 'coordinates']);
  }

  function isOnBoard() {
    return player.coordinates.x !== undefined && player.coordinates.y !== undefined;
  }

  function move(newCoordinates) {
    player.coordinates.x = newCoordinates.x;
    player.coordinates.y = newCoordinates.y;
  }
}

function generateId() {
  return crypto.randomBytes(2).toString('hex');
}
