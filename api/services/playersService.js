'use strict';

const _ = require('lodash');

const boardService = require('./boardService');
const playerService = require('./playerService');

const players = [];

module.exports = {
  canPlayer1SeePlayer2,
  createPlayer,
  findPlayer,
};

function canPlayer1SeePlayer2(player1, player2) {
  const player1Board = boardService.getPlayerBoard(player1);
  return player1Board.some(row => {
    return row.some(square => {
      return square.player && (square.player.id === player2.id);
    });
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
