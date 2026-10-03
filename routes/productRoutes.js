const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

const { cacheMiddleware, invalidateCache } = require('../middleware/cache');

router.use(invalidateCache);

router.get('/', cacheMiddleware, productController.getAllProducts);
router.get('/:id', cacheMiddleware, productController.getProductById);

module.exports = router;