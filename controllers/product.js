/** Require Model */
const Product = require('../models/product');
const Category = require('../models/category');
/**
 * Fetch all products
 * @method GET
 * @author Santhosh K Nair
 */
exports.getProducts = (req, res, next) => {
    Product.find()
        .select('_id title price image status')
        .populate('categoryId', 'title')
        .then(products => {
            res.render('admin/product-list', {
                products: products,
                title: 'products',
                tab: 'product'
            });
        })
        .catch(err => console.log(err));
};

/**
 * load add product page
 * @method GET
 * @author Santhosh K Nair
 */
exports.addProduct = (req, res, next) => {
    Category.find({ status: true })
        .select('_id title')
        .then(categories => {
            console.log(categories);
            res.render('admin/add-product', {
                categories: categories,
                title: 'Add Product',
                tab: 'product'
            });
        })
        .catch(err => console.log(err));
};

/**
 * save product data
 * @method GET
 * @author Santhosh K Nair
 */
exports.saveProduct = (req, res, next) => {
    const image = req.file;
    const filename = image.filename;
    const product = new Product({
        title: capitalize(req.body.title),
        categoryId: req.body.category,
        price: req.body.price,
        image: filename,
        status: req.body.status,
    });
    product
        .save()
        .then(result => {
            console.log('Product Created');
            res.redirect('/product/list');
        })
        .catch(err => {
            console.log(err);
        });
};

/**
 * update product status By Id
 * @method GET
 * @author Santhosh K Nair
 */
exports.statusUpdate = (req, res, next) => {
    const productId = req.params.productId;
    const status = (JSON.parse(req.params.status) == false) ? true : false;
    Product.findByIdAndUpdate(productId, { status: status })
        .then(() => {
            console.log('Status Updated!');
            res.redirect('/product/list');
        })
        .catch(err => console.log(err));
};

/**
 * Edit product - get product details by id & load edit page.
 * @method GET
 * @author Santhosh K Nair
 */
exports.getProductById = (req, res, next) => {
    const productId = req.params.productId;
    //Fetch all active categories & Product By Id using Promise all.
    //same we can do using promise call back 
    Promise.all([
        Product.findById(productId)
            .select('_id categoryId title price status')
            .populate('categoryId', 'title'),
        Category.find({ status: true })
            .select('_id title')
    ]).then(result => {
        const [product, categories] = result;
        console.log(product);
        if (!product) {
            return res.redirect('/product/list');
        }
        res.render('admin/edit-product', {
            title: 'Edit product',
            tab: 'product',
            product: product,
            categories: categories
        });
    })
        .catch(err => console.log(err));
};

/**
 * Update Product ById
 * @method GET
 * @author Santhosh K Nair
 */
exports.updateProductById = (req, res, next) => {
    const productId = req.body.productId;
    const image = req.file;
    Product.findById(productId)
        .select('_id title price categoryId image status')
        .then(product => {
            product.title = capitalize(req.body.title);
            product.categoryId = req.body.category;
            product.price = req.body.price;
            if (image) {
                product.image = image.filename;
            }
            product.status = req.body.status;
            return product.save();
        })
        .then(result => {
            console.log('Product updated!');
            res.redirect('/product/list');
        })
        .catch(err => console.log(err));
};

/**
 * Delete Product
 * @method GET
 * @author Santhosh K Nair
 */
exports.deleteProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findByIdAndRemove(productId)
        .then(() => {
            console.log('Category Deleted');
            res.redirect('/product/list');
        })
        .catch(err => console.log(err));
};
/**
 * Convert first letter to capital
 */
const capitalize = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
