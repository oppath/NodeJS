/** Require Model */
const Category = require('../models/category');

/**
 * Fetch all category
 * @method GET
 * @author Santhosh K Nair
 */
exports.getCategoryList = (req, res, next) => {
    Category.find()
        .select('_id title status')
        .then(categories => {
            res.render('admin/category-list', {
                categories: categories,
                title: 'categories',
                tab: 'category'
            });
        })
        .catch(err => console.log(err));
};

/**
 * load add category page
 * @method GET
 * @author Santhosh K Nair
 */
exports.addCategory = (req, res, next) => {
    res.render('admin/add-category', {
        title: 'Add Category',
        tab: 'category'
    });
};

/**
 * save category data
 * @method GET
 * @author Santhosh K Nair
 */
exports.saveCategory = (req, res, next) => {
    const title = capitalize(req.body.title);
    const status = req.body.status;
    //console.log(title);
    const category = new Category({
        title: title,
        status: status,
    });
    category
        .save()
        .then(result => {
            //console.log(result);
            console.log('Category Created');
            res.redirect('/category/list');
        })
        .catch(err => {
            console.log(err);
        });
};

/**
 * update category status By Id
 * @method GET
 * @author Santhosh K Nair
 */
exports.statusUpdate = (req, res, next) => {
    const categoryId = req.params.categoryId;
    const status = (JSON.parse(req.params.status) == false) ? true : false;
    //console.log('categoryId', categoryId);
    //console.log('status', status);
    Category.findByIdAndUpdate(categoryId, { status: status })
        .then(() => {
            console.log('Status Updated!');
            res.redirect('/category/list');
        })
        .catch(err => console.log(err));
};

/**
 * Delete Category
 * @method GET
 * @author Santhosh K Nair
 */
exports.deleteCategory = (req, res, next) => {
    const categoryId = req.params.categoryId;
    Category.findByIdAndRemove(categoryId)
        .then(() => {
            console.log('Category Deleted');
            res.redirect('/category/list');
        })
        .catch(err => console.log(err));
};

/**
 * Edit Category - get category details by id & load edit page.
 * @method GET
 * @author Santhosh K Nair
 */
exports.getCategoryById = (req, res, next) => {
    const categoryId = req.params.categoryId;
    Category.findById(categoryId)
        .select('_id title status')
        .then(category => {
            if (!category) {
                return res.redirect('/category/list');
            }
            res.render('admin/edit-category', {
                title: 'Edit Category',
                tab: 'category',
                category: category
            });
        })
        .catch(err => console.log(err));
};

/**
 * Update Category By Id
 * @method GET
 * @author Santhosh K Nair
 */
exports.updateCategoryById = (req, res, next) => {
    const categoryId = req.body.categoryId;
    const title = capitalize(req.body.title);
    const status = req.body.status;

    Category.findById(categoryId)
        .select('_id title status')
        .then(category => {
            category.title = title;
            category.status = status;
            return category.save();
        })
        .then(result => {
            console.log('Category updated!');
            res.redirect('/category/list');
        })
        .catch(err => console.log(err));
};

/**
 * Convert first letter to capital
 */
const capitalize = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}