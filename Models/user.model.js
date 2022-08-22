const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const argon2 = require("argon2");



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
        required: true
    }
})

module.exports = mongoose.model('User', UserSchema);
