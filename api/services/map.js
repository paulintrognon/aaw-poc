'use strict';

const _ = require('lodash');
const terrains = [
  {
    name: 'Grass',
    canWalk: true,
  },
  {
    name: 'Water',
    canWalk: false,
  },
];

module.exports = mapServiceFactory();

function mapServiceFactory() {
  const mapService = {};

  mapService.generate = generate;

  return mapService;

  // ------------------------------------------------------

  function generate(sizeX, sizeY) {
    mapService.sizeX = sizeX;
    mapService.sizeY = sizeY;
    const map = [];
    for (var x = 0; x < sizeX; x++) {
      map.push([]);
      for (var y = 0; y < sizeY; y++) {
        map[x][y] = generateTerrain();
      }
    }
    mapService.map = map;
    return mapService.map;
  }

  function generateTerrain() {
    return _.sample(terrains);
  }
}
