const express = require('express');
const router = express.Router();

const Controller = require('../controllers/controller.js');

// Semua router endpoint yang ada hub dengan /ide
// ditaruh di sini
router.get('/', Controller.getIdentityRootHandler);
router.get('/add', Controller.getIdentityAddHandler);
router.post('/add', Controller.postIdentityAddHandler);
router.get('/edit/:id', Controller.getIdentityEditHandler);
router.post('/edit/:id', Controller.postIdentityEditHandler);
router.get('/del/:id', Controller.getIdentityDelHandler);

module.exports = router;