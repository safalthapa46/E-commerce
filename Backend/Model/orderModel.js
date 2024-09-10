const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;

const orderSchema = new mongoose.Schema({
   user: {
    type: String,
    ref: 'User'
   },
   product: {
    type: ObjectId,
    ref: 'ProductModel',
    required: true
   },
   totalOrder: {
    type: Number
   }
},{timestamps: true})

module.exports = mongoose.model('Order',orderSchema)