const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({
    categoryName:{
        type: String,
        required:true,
        trim:true
    }
},{timestamps: true})

module.exports = mongoose.model('CategoryModel',categorySchema)