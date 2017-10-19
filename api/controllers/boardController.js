'use strict';

const _ = require('lodash');
const bluebird = require('bluebird');

const boardService = require('../services/boardService');

module.exports = {
  getBoardForPlayer,
};

function getBoardForPlayer(req) {
  return boardService.getBoard();
}
