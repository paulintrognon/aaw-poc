const express = require('express');
const router = express.Router();

const gameController = require('../controllers/gameController');

router.post('/player', (req, res, next) => next(gameController.createPlayer(req)));
router.get('/player', (req, res, next) => next(gameController.fetchPlayer(req)));
router.get('/score-board', (req, res, next) => next(gameController.getScoreBoard(req)));

module.exports = router;
