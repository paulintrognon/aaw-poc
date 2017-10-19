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

module.exports = {
  getPlayerBoard,
  generateBoard,
  generateSpawnableCoordinates,
  movePlayer,
};

let board;

function getPlayerBoard(player) {
  const coordinates = player.coordinates;
  const boardSquares = [];
  for (let a = 0; a < 7; a++) {
    const x = coordinates.x + a - 3;
    boardSquares.push([]);
    for (let b = 0; b < 7; b++) {
      const y = coordinates.y + b - 3;
      boardSquares[a][b] = getSquare(x, y);
    }
  }
  return boardSquares;
}

function generateBoard(sizeX, sizeY) {
  const boardSquares = [];
  for (let x = 0; x < sizeX; x++) {
    boardSquares.push([]);
    for (let y = 0; y < sizeY; y++) {
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

function getSquare(x, y) {
  if (!board.boardSquares[x]) {
    return;
  }
  return board.boardSquares[x][y];
}
