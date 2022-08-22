const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


const UserSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    username: {
        type: String,
        default: ''
    },
    password: {
        type: String,
    },
    avatarUrl: {
        type: String
    },
    fromThirdPartyAuth: {
        type:Boolean,
        default: false
    }
})

module.exports = mongoose.model('User', UserSchema);
