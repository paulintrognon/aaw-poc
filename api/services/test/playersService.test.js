'use strict';

const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');
const should = require('should');

const service = proxyquire('../playersService.js', {});

describe('playersService', () => {
  describe('.canPlayer1SeePlayer2', canPlayer1SeePlayer2Tests);
  describe('.getAllPlayersInSightOfPlayer', getAllPlayersInSightOfPlayerTests);
});

function canPlayer1SeePlayer2Tests() {
  it('should return true if player1 can see player2', canSeeTest);
  it('should return false if player1 can not see player2', canNotSeeTest);
  it('should return true if player1 can see player2 using extraRange', extraRangeSeeTest);

  const player1 = { id: 'player1' };
  const player2 = { id: 'player2' };

  function canSeeTest() {
    testTrue({x: 10, y: 5, sight: 3}, {x: 13, y: 8});
    testTrue({x: 10, y: 5, sight: 3}, {x: 7, y: 8});
    testTrue({x: 10, y: 5, sight: 3}, {x: 13, y: 2});
    testTrue({x: 10, y: 5, sight: 3}, {x: 7, y: 2});
    testTrue({x: 10, y: 5, sight: 3}, {x: 11, y: 4});
  }

  function canNotSeeTest() {
    testFalse({x: 10, y: 5, sight: 3}, {x: 14, y: 8});
    testFalse({x: 10, y: 5, sight: 3}, {x: 6, y: 8});
    testFalse({x: 10, y: 5, sight: 3}, {x: 13, y: 1});
    testFalse({x: 10, y: 5, sight: 3}, {x: 7, y: 9});
    testFalse({x: 10, y: 5, sight: 3}, {x: 0, y: 0});
  }

  function extraRangeSeeTest() {
    testTrue({x: 10, y: 5, sight: 3}, {x: 14, y: 8}, 1);
    testTrue({x: 10, y: 5, sight: 3}, {x: 6, y: 8}, 1);
    testTrue({x: 10, y: 5, sight: 3}, {x: 13, y: 1}, 1);
    testTrue({x: 10, y: 5, sight: 3}, {x: 7, y: 9}, 1);
    testTrue({x: 10, y: 5, sight: 3}, {x: 0, y: 0}, 10);
  }

  function testTrue(p1, p2, extraRange) {
    test(p1, p2, extraRange, true);
  }

  function testFalse(p1, p2, extraRange) {
    test(p1, p2, extraRange, false);
  }

  function test(p1, p2, extraRange, expectedResult) {
    player1.sight = p1.sight;
    player1.coordinates = {
      x: p1.x,
      y: p1.y,
    };
    player2.coordinates = p2;
    const result = service.canPlayer1SeePlayer2(player1, player2, extraRange);
    should(result).equal(expectedResult);
  }
}

function getAllPlayersInSightOfPlayerTests() {
  const player1 = {
    sight: 3,
    id: 1,
    coordinates: {x: 10, y: 10},
  };
  const player2 = {
    id: 2,
    coordinates: {x: 7, y: 13},
  };
  const player3 = {
    id: 3,
    coordinates: {x: 14, y: 7},
  };
  const player4 = {
    id: 4,
    coordinates: {x: 100, y: 110},
  };
  service.createPlayer(player1);
  service.createPlayer(player2);
  service.createPlayer(player3);
  service.createPlayer(player4);

  it('should return the list of players in sight of player1', inSightTest);
  it('should return the list of players in sight of player1 (extraRange)', inSightExtraRangeTest);

  function inSightTest() {
    const players = service.getAllPlayersInSightOfPlayer(player1);
    should(players.length).equal(1);
    should(players[0]).have.properties({ id: 2 });
  }

  function inSightExtraRangeTest() {
    const players = service.getAllPlayersInSightOfPlayer(player1, 1);
    should(players.length).equal(2);
    should(players[0]).have.properties({ id: 2 });
    should(players[1]).have.properties({ id: 3 });
  }
}
