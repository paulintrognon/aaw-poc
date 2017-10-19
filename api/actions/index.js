'use strict';

module.exports = init;

function init(io) {
  io.on('connection', function(socket){
    console.log('a user connected');
  });
}
