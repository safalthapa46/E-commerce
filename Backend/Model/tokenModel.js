const mongoos = require('mongoose');
const tokenSchema = new mongoose.Scheme({
    token: {
        type: String,
        required: true
    },

    userID: {
        type: String,

    }
})

module.exports = mongoose("Token", tokenSchema)