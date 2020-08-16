const express = require('express');
const router = express.Router();

const Controller = require('../controllers/controller.js');
const identityRoutes = require('./identities.js');

// Semua route akan dihandle oleh si index ini
router.get('/', Controller.getRootHandler);
router.use('/ide', identityRoutes);

module.exports = router;