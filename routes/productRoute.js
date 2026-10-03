const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const cacheMiddleware = require('../middleware/cache');

router.get('/', cacheMiddleware, productController.getAllProducts);
router.get('/:id', cacheMiddleware, productController.getProductById);

module.exports = router;