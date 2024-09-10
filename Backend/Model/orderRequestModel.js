
const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;

const orderRequestSchema = new mongoose.Schema({
   products: [
    {
    type: ObjectId,
    ref: 'ProductModel',
   }
],
   totalOrder: {
    type: Number
   },
   totalPrice: {
    type: Number
   },
   orderStatus: {
    type: String,
    default: 'shipping',
    enum: ['shipping' ,'payment' ,'delivered' , 'cancelled']
   },
   shippingAddress: {
    user: {
        type: String,
        ref: 'User'
       },
       address: {
        type: String
       }
   },
   stripePaymentIntentId: {
    type: String,
   //  required: true,    // This ID is returned by stripe when creating a payment intent
   },
   stripeChargeId: {
    type: String,
    default: null,   // This will be populated when the charge is successful
   },
},{timestamps: true})

module.exports = mongoose.model('OrderRequest',orderRequestSchema)