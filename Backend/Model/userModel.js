const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        default: "user",
        enum: ['admin', 'user']
    },
    isverified:{
        type: Boolean,
        default: false
    },
    userDetail: {
        firstName: {
            type: String
        },
        middleName: {
            type: String
        },
        lastName: {
            type: String
        },
        phoneNumber: {
            type: String
        },
        address: {
            type: String
        },
        gender: {
            type: String
        }
    }
});

module.exports = mongoose.model('User', UserSchema);