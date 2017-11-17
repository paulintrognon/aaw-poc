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
  findPlayerByName,
  getScores,
};

function attack(player, enemy) {
  const damages = player.shoot();
  enemy.receiveDamages(damages);
  return damages;
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
  information.team = decideTeam();
  const newPlayer = playerService.createPlayer(information);
  players.push(newPlayer);
  return newPlayer;
}

function findPlayer(playerId) {
  return _.find(players, player => player.id === playerId);
}

function findPlayerByName(playerName) {
  return _.find(players, player => player.name.toLowerCase() === playerName.toLowerCase());
}

function getScores() {
  const scores = players.map(player => {
    return {
      name: player.name,
      team: player.team,
      kills: player.kills,
      deaths: player.deaths,
    };
  });
  return _.orderBy(scores, 'kills', 'desc');
}

function decideTeam() {
  const counts = {
    AT: 0,
    GE: 0,
  };
  players.forEach(player => {
    counts[player.team]++;
  });
  if (counts.AT > counts.GE) {
    return 'GE';
  }
  if (counts.GE > counts.AT) {
    return 'AT';
  }
  return _.sample(['AT', 'GE']);
}
