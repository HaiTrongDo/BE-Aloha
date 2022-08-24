const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


const UserSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
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
    },
    phone:{
        type: String,
        optional: true,
    },
    company:{
        type: String,
        optional: true,
    },
    birthday:{
        type: String,
        optional: true,
    },
},{timestamps: true})

module.exports = mongoose.model('User', UserSchema);
