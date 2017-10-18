'use strict';

const _ = require('lodash');
const availableTerrains = [
  {
    type: 'grass',
    name: 'Grass',
    canWalk: true,
  },
  {
    type: 'water',
    name: 'Water',
    canWalk: false,
  },
];

module.exports = boardServiceFactory();

function boardServiceFactory() {
  const boardService = {};
  let board;

  boardService.generateBoard = generateBoard;
  boardService.generateSpawnableCoordinates = generateSpawnableCoordinates;
  boardService.movePlayer = movePlayer;

  return boardService;

  // ------------------------------------------------------

  function generateBoard(sizeX, sizeY) {
    const boardSquares = [];
    for (var x = 0; x < sizeX; x++) {
      boardSquares.push([]);
      for (var y = 0; y < sizeY; y++) {
        boardSquares[x][y] = {
          coordinates: {
            x,
            y,
          },
          terrain: _.sample(availableTerrains),
        };
      }
    }
    board = {
      boardSquares,
      sizeX,
      sizeY,
    };
    return board;
  }

  function generateRandomCoordinates() {
    return {
      x: _.random(0, board.sizeX - 1),
      y: _.random(0, board.sizeY - 1),
    };
  }

  function generateSpawnableCoordinates() {
    let coordinates = generateRandomCoordinates();
    while (!isWalkable(coordinates)) {
      coordinates = generateRandomCoordinates();
    }
    return coordinates;
  }

  function isWalkable(coordinates) {
    const boardSquare = board.boardSquares[coordinates.x][coordinates.y];
    if (!boardSquare.terrain.canWalk) {
      return false;
    }
    if (boardSquare.player) {
      return false;
    }
    return true;
  }

  function movePlayer(player, newCoordinates) {
    if (player.coordinates) {
      board.boardSquares[player.coordinates.x][player.coordinates.y].player = null;
    }
    board.boardSquares[newCoordinates.x][newCoordinates.y].player = player;
  }
}
