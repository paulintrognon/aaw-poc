const express = require('express');
const router = express.Router();

const boardController = require('../controllers/boardController');

router.get('/get', (req, res, next) => next(boardController.getBoardForPlayer(req)));

module.exports = router;
