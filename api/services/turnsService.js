const actions = require('../actions/index');

module.exports = {
  setupTurnsForPlayer,
};

function setupTurnsForPlayer(player) {
  if (player.newTurnInterval) {
    clearInterval(player.newTurnInterval);
  }
  player.newTurn();
  player.newTurnInterval = setInterval(() => {
    newTurn(player);
  }, 1000 * 3600 * 2);
  return player.newTurnInterval;
}

function newTurn(player) {
  player.newTurn();
  actions.informPlayerOfNewTurn(player);
}
