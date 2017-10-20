'use strict';

const express = require('express');
const router = express.Router();

const version = require('../../package.json').version;

router.get('/', (req, res, next) => next({ hello: 'world' }));
router.get('/version', (req, res, next) => next({ version }));

const gameRoutes = require('./gameRoutes');
router.use('/game', gameRoutes);

const boardRoutes = require('./boardRoutes');
router.use('/board', boardRoutes);

const playersRoutes = require('./playersRoutes');
router.use('/players', playersRoutes);

module.exports = router;
