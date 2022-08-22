let config = require('../config/db.config'),
    jwt = require('jsonwebtoken');

let User = require("../Models/user.model");
const asyncWrapper = require("../Middleware/async");
module.exports = {
    signup: asyncWrapper( async function (req, res) {
        console.log(req.body);
        if (!req.body.email || !req.body.password) {
            res.status(401).json({success: false, msg: 'Please pass username and password.'});
        } else {
            let newUser = new User({
                email: req.body.email,
                password: req.body.password
            });
            await newUser.save(function (err) {
                if (err) {
                    return res.status(401).json({success: false, msg: 'Username already exists.'});
                }
                res.json({success: true, msg: 'Successful created new user.'});
            });
        }
    }),
    signin: asyncWrapper(function  (req, res) {
         User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err){
                throw err;
            }
             console.log(user)
            if (!user) {
                res.status(401).json({success: false, msg: 'Authentication failed. User not found.'});
            } else {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        let token = jwt.sign(user.toJSON(),process.env.SECRET_KEY);
                        res.json({success: true, token: 'JWT ' + token});
                    } else {
                        res.status(401).json({success: false, msg: 'Authentication failed. Wrong password.'});
                    }
                });
            }
        })
    })
};