'use strict';

const _ = require('lodash');
const moment = require('moment');
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
    sight: 3,
    actionPoints: 15,
    lastTurnDate: new Date(),
    nextTurnDate: new Date(),
    weapon: {
      name: 'AK-47',
      range: 2,
      shots: 3,
      damages: { min: 6, max: 8 },
    },
    deaths: 0,
    kills: 0,
  };
  const publicProperties = [
    'id',
    'name',
    'coordinates',
    'weapon',
    'deaths',
    'kills',
  ];
  const privateProperties = publicProperties.concat([
    'health',
    'sight',
    'actionPoints',
    'lastTurnDate',
    'nextTurnDate',
  ]);

  player.getPublicProperties = getPublicProperties;
  player.getPrivateProperties = getPrivateProperties;
  player.isOnBoard = isOnBoard;
  player.loadSocket = loadSocket;
  player.getCoordinates = getCoordinates;
  player.setCoordinates = setCoordinates;
  player.fullHealth = fullHealth;
  player.newTurn = newTurn;
  player.shoot = shoot;
  player.receiveDamages = receiveDamages;

  return player;

  // ------------------------------------------------------

  function getPublicProperties() {
    return _.pick(player, publicProperties);
  }

  function getPrivateProperties() {
    return _.pick(player, privateProperties);
  }

  function isOnBoard() {
    return player.coordinates.x !== undefined && player.coordinates.y !== undefined;
  }

  function loadSocket(socketId) {
    player.socketId = socketId;
    console.log(player.socketId);
  }

  function getCoordinates() {
    return {
      x: player.coordinates.x,
      y: player.coordinates.y,
    }
  }

  function setCoordinates(newCoordinates) {
    player.coordinates.x = newCoordinates.x;
    player.coordinates.y = newCoordinates.y;
  }

  function shoot() {
    let damages = 0;
    for (var i = 0; i < player.weapon.shots; i++) {
      damages += _.random(player.weapon.damages.min, player.weapon.damages.max);
    }
    return damages;
  }

  function receiveDamages(damages) {
    player.health -= damages;
    if (player.health < 1) {
      player.health = 0;
    }
  }

  function fullHealth() {
    player.health = 100;
    player.actionPoints = 15;
  }

  function newTurn() {
    player.lastTurnDate = new Date();
    player.nextTurnDate = moment().add(2, 'minutes').toDate();
    player.actionPoints = 15;
    player.health += 5;
    if (player.health > 100) {
      player.health = 100;
    }
  }
}

function generateId() {
  return crypto.randomBytes(2).toString('hex');
}
