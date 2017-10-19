const jwt = require('jsonwebtoken');
const secret = require('config/secret').secret;

const logger = require('../logger');

module.exports = {
  create,
  decode,
};

function create(player) {
  return jwt.sign({ id: player.id }, secret);
}

function decode(token) {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    logger.error(e.message);
    return null;
  }
}
