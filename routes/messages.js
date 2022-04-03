const express = require('express');
const { Router } = express;
const router = Router();
const controller = require('../controllers/message')


// Add new message
router.post("/",controller.newMessage) 
// Get all messages
router.get('/', controller.getAll)

module.exports = router;
