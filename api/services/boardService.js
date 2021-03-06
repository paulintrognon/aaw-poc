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
  availableTerrains.grass,
  availableTerrains.grass,
  availableTerrains.water,
];

const playersService = require('./playersService');

module.exports = {
  getPlayerBoard,
  generateBoard,
  generateSpawnableCoordinates,
  movePlayer,
};

let board;

function getPlayerBoard(player) {
  const coordinates = player.coordinates;

  // Create player board
  const boardSquares = [];
  for (let a = 0; a < player.sight * 2 + 1; a++) {
    const y = coordinates.y + a - player.sight;
    boardSquares.push([]);
    for (let b = 0; b < player.sight * 2 + 1; b++) {
      const x = coordinates.x + b - player.sight;
      const square = _.clone(getSquare(x, y));
      if (square.player) {
        square.player = square.player.getPublicProperties();
        square.player.isInRange = playersService.canPlayer1RangePlayer2(player, square.player);
      }
      boardSquares[a][b] = square;
    }
  }

  // Mark walkable squares
  for (var x = player.sight - 1; x <= player.sight + 1; x++) {
    for (var y = player.sight - 1; y <= player.sight + 1; y++) {
      boardSquares[y][x].isWalkable = isWalkable(boardSquares[y][x]);
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
  while (!isWalkable(getSquare(coordinates.x, coordinates.y))) {
    coordinates = generateRandomCoordinates();
  }
  return coordinates;
}

function isWalkable(square) {
  if (!square.terrain.canWalk) {
    return false;
  }
  if (square.player) {
    return false;
  }
  return true;
}

function movePlayer(player, newCoordinates) {
  if (player.isOnBoard()) {
    board.boardSquares[player.coordinates.y][player.coordinates.x].player = null;
  }
  if (newCoordinates.x !== undefined && newCoordinates.y !== undefined) {
    board.boardSquares[newCoordinates.y][newCoordinates.x].player = player;
  }
}

function getSquare(x, y) {
  if (!board.boardSquares[y]) {
    return generateVoidSquare(x, y);
  }
  return board.boardSquares[y][x] || generateVoidSquare(x, y);
}

function generateVoidSquare(x, y) {
  return {
    terrain: availableTerrains.void,
    coordinates: { x, y },
  };
}
