'use strict';

const _ = require('lodash');
const bluebird = require('bluebird');

const playerService = require('./playerService');

const players = [];

module.exports = {
  attack,
  canPlayer1SeePlayer2,
  canPlayer1RangePlayer2,
  getAllPlayersInSightOfPlayer,
  createPlayer,
  findPlayer,
};

function attack(player, enemy) {
  if (!canPlayer1RangePlayer2(player, enemy)) {
    return bluebird.reject({
      name: 'player-not-in-range',
      message: `${player.id} cannot range ${enemy.id}`,
    });
  }
  const damages = player.shoot();
  enemy.receiveDamages(damages);
  return bluebird.resolve({ damages });
}

function canPlayer1RangePlayer2(player1, player2) {
  return isInReach(player1, player2, player1.weapon.range);
}

function canPlayer1SeePlayer2(player1, player2, extraRange) {
  const totalSight = player1.sight + (extraRange || 0);

  return isInReach(player1, player2, totalSight);
}

function isInReach(player1, player2, range) {
  return (player2.coordinates.x >= player1.coordinates.x - range)
    && (player2.coordinates.x <= player1.coordinates.x + range)
    && (player2.coordinates.y >= player1.coordinates.y - range)
    && (player2.coordinates.y <= player1.coordinates.y + range);
}

function getAllPlayersInSightOfPlayer(player, extraRange) {
  return players.filter(playerToTest => {
    return canPlayer1SeePlayer2(player, playerToTest, extraRange);
  });
}

function createPlayer(information) {
  const player = playerService.createPlayer(information);
  players.push(player);
  return player;
}

function findPlayer(playerId) {
  return _.find(players, player => player.id === playerId);
}
