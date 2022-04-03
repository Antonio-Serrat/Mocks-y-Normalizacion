const express = require('express');
const controller = require('../controllers/product')
const { Router } = express;
const router = Router();
const upload = require('../middlewares/file');

// Drop and create table
router.get('/createTable',controller.dropCreateTable)
// Get all produts
router.get('/', controller.get)
// Get product by id
router.get('/:id', controller.getById)
// Add new product
router.post("/", upload.single("thumbnail"), controller.create)
// Update product by id
router.put("/:id", upload.single("thumbnail"), controller.update)
// Delete product by id
router.delete('/:id', controller.deleteById)


module.exports = router;
