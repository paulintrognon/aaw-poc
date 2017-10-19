const express = require('express');
const router = express.Router();

const gameController = require('../controllers/gameController');

router.post('/player', (req, res, next) => next(gameController.createPlayer(req)));

module.exports = router;
