const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

const { cacheMiddleware, invalidateCache } = require('../middleware/cache');

router.use(invalidateCache);

router.get('/', cacheMiddleware, productController.getAllProducts);

router.get('/:id', cacheMiddleware, productController.getProductById);

router.post('/', productController.createProduct);

router.put('/:id', productController.updateProduct);

router.patch('/:id', productController.patchProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;
