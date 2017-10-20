const express = require('express');
const router = express.Router();

const playersController = require('../controllers/playersController');

router.post('/own/move', (req, res, next) => next(playersController.moveOwnPlayer(req)));

module.exports = router;
