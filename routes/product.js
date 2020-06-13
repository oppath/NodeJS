const express = require('express');
const router = express.Router();

/** Require controller */
const productController = require('../controllers/product');

/**
 * Fetch all products for listing
 * @method GET
 * @author Santhosh K Nair
 */
router.get('/list', productController.getProducts);

/**
 * load add product page 
 * @method GET
 * @author Santhosh K Nair
 */
router.get('/add', productController.addProduct);

/**
 * Save product details
 * @method POST
 * @author Santhosh K Nair
 */
router.post('/save', productController.saveProduct);

/**
 * Product status switch functionality.
 * @method GET
 * @author Santhosh K Nair
 */
router.get('/statusupdate/:productId/:status', productController.statusUpdate);

/**
 * Edit Product.
 * @method GET
 * @author Santhosh K Nair
 */
router.get('/edit/:productId/', productController.getProductById);

/**
 * Update Product.
 * @method GET
 * @author Santhosh K Nair
 */
router.post('/edit/', productController.updateProductById);

/**
 * Delete Product.
 * @method GET
 * @author Santhosh K Nair
 */
router.get('/delete/:productId', productController.deleteProduct);

module.exports = router;