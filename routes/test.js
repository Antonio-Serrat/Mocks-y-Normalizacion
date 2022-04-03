const express = require('express');
const controller = require('../controllers/product')
const { Router } = express;
const router = Router();

//test route
router.get('/', controller.testing)

module.exports = router;