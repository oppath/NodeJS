const express = require('express');
const router = express.Router();

/** Require controller */
const categoryController = require('../controllers/category');

/**
 * Fetch all category for listing
 * @method GET
 * @author Santhosh K Nair
 */
router.get('/list', categoryController.getCategoryList);

/**
 * load add category page 
 * @method GET
 * @author Santhosh K Nair
 */
router.get('/add', categoryController.addCategory);

/**
 * Save Category details
 * @method POST
 * @author Santhosh K Nair
 */
router.post('/save', categoryController.saveCategory);

/**
 * Category status switch functionality.
 * @method GET
 * @author Santhosh K Nair
 */
router.get('/statusupdate/:categoryId/:status', categoryController.statusUpdate);

/**
 * Edit category.
 * @method GET
 * @author Santhosh K Nair
 */
router.get('/edit/:categoryId/', categoryController.getCategoryById);

/**
 * Update category.
 * @method GET
 * @author Santhosh K Nair
 */
router.post('/edit/', categoryController.updateCategoryById);

/**
 * Delete Category.
 * @method GET
 * @author Santhosh K Nair
 */
router.get('/delete/:categoryId', categoryController.deleteCategory);

module.exports = router;
