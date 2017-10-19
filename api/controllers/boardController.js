'use strict';

const _ = require('lodash');
const bluebird = require('bluebird');

const boardService = require('../services/boardService');
const playersService = require('../services/playersService');

module.exports = {
  getBoardForPlayer,
};

function getBoardForPlayer(req) {
  if (!req.playerId) {
    return bluebird.reject({
      status: 401,
      name: 'not-indentified',
      name: 'Authentification needed',
    });
  }
  const player = playersService.findPlayer(req.playerId);
  const board = boardService.getPlayerBoard(player);
  return { board };
}
