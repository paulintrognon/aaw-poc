'use strict';

const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');
const should = require('should');

const boardServiceStub = {};
const service = proxyquire('../playersService.js', {
  './boardService': boardServiceStub,
});

describe('playersService', () => {
  describe('.canPlayer1SeePlayer2', canPlayer1SeePlayer2Tests);
});

function canPlayer1SeePlayer2Tests() {
  it('should return true if player1 can see player2', canSeeTest);
  it('should return false if player1 can not see player2', canNotSeeTest);

  const player1 = { id: 'player1' };
  const player2 = { id: 'player2' };

  function canSeeTest() {
    const board = [
      [ {}, {} ],
      [
        {},
        { player: player2 },
      ],
      [ {}, {} ],
    ];
    boardServiceStub.getPlayerBoard = sinon.stub().returns(board);
    const result = service.canPlayer1SeePlayer2(player1, player2);
    should(result).equal(true);
  }

  function canNotSeeTest() {
    const board = [
      [ {}, {} ],
      [
        {},
        { player: player1 },
      ],
      [ {}, {} ],
    ];
    boardServiceStub.getPlayerBoard = sinon.stub().returns(board);
    const result = service.canPlayer1SeePlayer2(player1, player2);
    should(result).equal(false);
  }
}
