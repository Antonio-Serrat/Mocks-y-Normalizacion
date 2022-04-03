const express = require('express');
const { Router } = express;
const router = Router();
const controller = require('../controllers/message')
const upload = require('../middlewares/file')


// Add new message
router.post("/", upload.single("avatar"), controller.newMessage) 
// Get all messages
router.get('/', controller.getAll)

module.exports = router;
