const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true
    },
    productPrice: {
        type: String,
        required: true,
        trim: true
    },

    productDescription: {
        type: String,
        required: true,
        trim: true
    },

    productRating: {
        type: String,
        required: true,
        trim: true,
        default: 1
    },

    productCategory: {
        type: ObjectId,
        ref: 'CategoryModel',
        required: true
    },
    productImage: {
        type: String,
    },
    totalProduct: {
        type: Number,
        default: 0
    }
}, { timestamps: true })



module.exports = mongoose.model('ProductModel', productSchema);