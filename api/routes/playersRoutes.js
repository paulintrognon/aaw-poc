const express = require('express');
const router = express.Router();

const playersController = require('../controllers/playersController');

router.post('/own/move', (req, res, next) => next(playersController.moveOwnPlayer(req)));
router.post('/own/attack', (req, res, next) => next(playersController.playerAttack(req)));

module.exports = router;
