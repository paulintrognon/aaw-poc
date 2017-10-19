'use strict';

const _ = require('lodash');
const availableTerrains = {
  grass: {
    type: 'grass',
    canWalk: true,
  },
  water: {
    type: 'water',
    canWalk: false,
  },
  void: {
    type: 'void',
    canWalk: false,
  },
};
const listOfTerrains = [
  availableTerrains.grass,
  availableTerrains.water,
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
    const y = coordinates.y + a - 3;
    boardSquares.push([]);
    for (let b = 0; b < 7; b++) {
      const x = coordinates.x + b - 3;
      boardSquares[a][b] = getSquare(x, y);
    }
  }
  return boardSquares;
}

function generateBoard(sizeX, sizeY) {
  const boardSquares = [];
  for (let y = 0; y < sizeY; y++) {
    boardSquares.push([]);
    for (let x = 0; x < sizeX; x++) {
      boardSquares[y][x] = {
        coordinates: {
          x,
          y,
        },
        terrain: _.sample(listOfTerrains),
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
  const boardSquare = getSquare(coordinates.x, coordinates.y);
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
    board.boardSquares[player.coordinates.y][player.coordinates.x].player = null;
  }
  board.boardSquares[newCoordinates.y][newCoordinates.x].player = player;
}

function getSquare(x, y) {
  if (!board.boardSquares[y]) {
    return { terrain: availableTerrains.void };
  }
  return board.boardSquares[y][x] || { terrain: availableTerrains.void };
}
