const argon2 = require("argon2");
let config = require('../config/db.config');
let jwt = require('jsonwebtoken');

let User = require("../Models/user.model");
const asyncWrapper = require("../Middleware/async");


module.exports = {

    signup: asyncWrapper(async function (req, res) {
        console.log(req.body);
        if (!req.body.email || !req.body.password) {
            res.status(401).json({success: false, msg: 'Please pass username and password.'});
        } else {
            const hashPassword = await argon2.hash(req.body.password)
            let newUser = new User({
                email: req.body.email, password: hashPassword
            });
            await newUser.save(function (err) {
                if (err) {
                    return res.status(401).json({success: false, msg: 'Username already exists.'});
                }
                res.json({success: true, msg: 'Successful created new user.'});
            });
        }
    }),
    signin: asyncWrapper(function (req, res) {
        console.log(req.body.email)
        User.findOne({
            email: req.body.email
        }, async function (err, user) {
            if (err) {
                console.log(err)
                throw err;
            }
            console.log(user)
            if (!user)
                return res
                    .status(400).json({success: false, message: 'wrong email or password'})
            const passwordValid = await argon2.verify(user.password, req.body.password);
            if (!passwordValid) return res.status(400).json({success: false, message: 'wrong email or password'})
            //tra ve 1 token
            let token = jwt.sign(user.toJSON(), process.env.SECRET_KEY);
            res.json({success: true, token: 'JWT ' + token});
        })
    }),

    changePassword: (async function (req, res) {
        console.log('thay doi pass')
        const {oldPassword, newPassword, confirmPassword} = req.body;
        if (!oldPassword) return res
            .status(400)
            .json({success: false, message: 'enter old password'})

        try {
            const passwordValid = await argon2.verify(req.user.password, oldPassword);
            if (!passwordValid)
                return res
                    .status(400)
                    .json({success: false, message: 'wrong old password'})
            if (newPassword !== confirmPassword)
                return res
                    .status(400)
                    .json({success: false, message: 'password did not match'})
            const hashPassword = await argon2.hash(newPassword)
            await User.updateOne({_id: req.user._id}, {
                password: hashPassword
            })
            res.status(200).json({success: true, message: 'change password successful'})
        } catch (err) {
            console.log(err)
            res.status(500).json({success: false, message: err.message})
        }
    }),

    signInWithFireBase: asyncWrapper(async function (req, res, next) {
        let currentUser = await User.findOne({email: req.body.email})
        if (!currentUser) {
            let currentUser = new User({...req.body, fromThirdPartyAuth: true});
            const savedUser = await currentUser.save()
        }
        let token = jwt.sign(JSON.stringify(req.body), process.env.SECRET_KEY);
        res.status(200).json({success: true, token: 'JWT ' + token, msg:"Login successful"});
    }),

};