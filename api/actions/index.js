'use strict';

module.exports = init;

const s = require('../services/playersService');

function init(io) {
  io.on('connection', function(socket){
    console.log('a user connected');
    s.createPlayer({ name: 'coucou' });
  });
}
