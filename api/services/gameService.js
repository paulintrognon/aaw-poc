'use strict';

const _ = require('lodash');
const bluebird = require('bluebird');
const boardService = require('./boardService');
const playersService = require('./playersService');
const actions = require('../actions');

module.exports = {
  init,
  spawnPlayer,
  movePlayerToCoordinates,
  attack,
};

function init() {
  boardService.generateBoard(10, 10);
}

function spawnPlayer(player) {
  const coordinates = boardService.generateSpawnableCoordinates();
  movePlayerToCoordinates(player, coordinates);
}

function movePlayerToCoordinates(player, newCoordinates) {
  const oldPlayer = _.cloneDeep(player);

  boardService.movePlayer(player, newCoordinates);
  player.setCoordinates(newCoordinates);

  actions.informPlayersOfPlayerMovement(oldPlayer, player);
}

function attack(player, enemy) {
  if (!playersService.canPlayer1RangePlayer2(player, enemy)) {
    return bluebird.reject({
      name: 'player-not-in-range',
      message: `${player.id} cannot range ${enemy.id}`,
    });
  }
  const damages = playersService.attack(player, enemy);
  actions.informPlayersOfPlayerAttacking(player);
  setTimeout(() => {
    actions.informPlayerOfDamageTaken(enemy, damages);
    if (enemy.health === 0) {
      player.kills++;
      enemy.deaths++;
      respawnPlayer(enemy);
    }
  }, 1000);
  return bluebird.resolve({ damages, hasKilled: enemy.health === 0 });
}

function respawnPlayer(player) {
  player.fullHealth();
  spawnPlayer(player);
}
