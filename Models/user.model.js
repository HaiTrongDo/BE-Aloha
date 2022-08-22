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
        minLength: [6,"is must be at least 6 characters"],
        maxLength: [12,"is must be at most 12 characters"],
        required: true
    }
})

module.exports = mongoose.model('User', UserSchema);
