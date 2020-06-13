const express = require('express');
const router = express.Router();

/** Require controller */
const bannerController = require('../controllers/banner');

/**
 * Fetch all banner for listing
 * @method GET
 * @author Santhosh K Nair
 */
router.get('/list', bannerController.getBannerList);

/**
 * load add banner page 
 * @method GET
 * @author Santhosh K Nair
 */
router.get('/add', bannerController.addBanner);

/**
 * Save banner details
 * @method POST
 * @author Santhosh K Nair
 */
router.post('/save', bannerController.saveBanner);

/**
 * banner status switch functionality.
 * @method GET
 * @author Santhosh K Nair
 */
router.get('/statusupdate/:bannerId/:status', bannerController.statusUpdate);

/**
 * Edit banner.
 * @method GET
 * @author Santhosh K Nair
 */
router.get('/edit/:bannerId/', bannerController.getBannerById);

/**
 * Update banner.
 * @method GET
 * @author Santhosh K Nair
 */
router.post('/edit/', bannerController.updateBannerById);

/**
 * Delete banner.
 * @method GET
 * @author Santhosh K Nair
 */
router.get('/delete/:bannerId', bannerController.deleteBanner);

module.exports = router;
