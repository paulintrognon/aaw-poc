'use strict';

const _ = require('lodash');

const playerService = require('./playerService');

const players = [];

module.exports = {
  canPlayer1SeePlayer2,
  getAllPlayersInSightOfPlayer,
  createPlayer,
  findPlayer,
};

function canPlayer1SeePlayer2(player1, player2, extraRange) {
  const totalSight = player1.sight + (extraRange || 0);

  return (player2.coordinates.x >= player1.coordinates.x - totalSight)
    && (player2.coordinates.x <= player1.coordinates.x + totalSight)
    && (player2.coordinates.y >= player1.coordinates.y - totalSight)
    && (player2.coordinates.y <= player1.coordinates.y + totalSight);
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
