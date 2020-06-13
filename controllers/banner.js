/** Require Model */
const Banner = require('../models/banner');

/**
 * Fetch all banner
 * @method GET
 * @author Santhosh K Nair
 */
exports.getBannerList = (req, res, next) => {
    Banner.find()
        .select('_id title image status')
        .then(banners => {
            res.render('admin/banner-list', {
                banners: banners,
                title: 'Banner',
                tab: 'banner'
            });
        })
        .catch(err => console.log(err));
};

/**
 * load add banner page
 * @method GET
 * @author Santhosh K Nair
 */
exports.addBanner = (req, res, next) => {
    res.render('admin/add-banner', {
        title: 'Banner',
        tab: 'banner'
    });
};

/**
 * save banner data
 * @method GET
 * @author Santhosh K Nair
 */
exports.saveBanner = (req, res, next) => {
    const image = req.file;
    const filename = image.filename;
    const banner = new Banner({
        title: capitalize(req.body.title),
        image: filename,
        status: req.body.status,
    });
    banner
        .save()
        .then(result => {
            console.log('Banner Created');
            res.redirect('/banner/list');
        })
        .catch(err => {
            console.log(err);
        });
};

/**
 * update banner status ById
 * @method GET
 * @author Santhosh K Nair
 */
exports.statusUpdate = (req, res, next) => {
    const bannerId = req.params.bannerId;
    const status = (JSON.parse(req.params.status) == false) ? true : false;
    Banner.findByIdAndUpdate(bannerId, { status: status })
        .then(() => {
            console.log('Status Updated!');
            res.redirect('/banner/list');
        })
        .catch(err => console.log(err));
};

/**
 * Edit banner - get banner details by id & load edit page.
 * @method GET
 * @author Santhosh K Nair
 */
exports.getBannerById = (req, res, next) => {
    const bannerId = req.params.bannerId;
    Banner.findById(bannerId)
        .select('_id title status')
        .then(banner => {
            if (!banner) {
                return res.redirect('/banner/list');
            }
            res.render('admin/edit-banner', {
                title: 'Edit Banner',
                tab: 'banner',
                banner: banner
            });
        })
        .catch(err => console.log(err));
};

/**
 * Update banner ById
 * @method GET
 * @author Santhosh K Nair
 */
exports.updateBannerById = (req, res, next) => {
    const bannerId = req.body.bannerId;
    const image = req.file;
    Banner.findById(bannerId)
        .select('_id title image status')
        .then(banner => {
            banner.title = capitalize(req.body.title);
            if (image) {
                banner.image = image.filename;
            }
            banner.status = req.body.status;
            return banner.save();
        })
        .then(result => {
            console.log('Banner updated!');
            res.redirect('/banner/list');
        })
        .catch(err => console.log(err));
};

/**
 * Delete banner
 * @method GET
 * @author Santhosh K Nair
 */
exports.deleteBanner = (req, res, next) => {
    const bannerId = req.params.bannerId;
    Banner.findByIdAndRemove(bannerId)
        .then(() => {
            console.log('Banner Deleted');
            res.redirect('/banner/list');
        })
        .catch(err => console.log(err));
};
/**
 * Convert first letter to capital
 */
const capitalize = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
