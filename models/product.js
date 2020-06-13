const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    created_on: {
        type: Date,
        default: Date.now
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    }
});

module.exports = mongoose.model('Product', productSchema);