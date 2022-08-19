let config = require('../config/db.config'),
    jwt = require('jsonwebtoken');

let User = require("../models/user.model");
module.exports = {
    signup:async function (req, res) {
        console.log(req.body);
        if (!req.body.email || !req.body.password) {
            res.json({success: false, msg: 'Please pass username and password.'});
        } else {
            let newUser = new User({
                email: req.body.email,
                password: req.body.password
            });
            await newUser.save(function (err) {
                if (err) {
                    return res.json({success: false, msg: 'Username already exists.'});
                }
                res.json({success: true, msg: 'Successful created new user.'});
            });
        }
    },
    signin:  function  (req, res) {
         User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err){
                throw err;
            }
             console.log(user)
            if (!user) {
                res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        let token = jwt.sign(user.toJSON(),process.env.SECRET_KEY);
                        res.json({success: true, token: 'JWT ' + token});
                    } else {
                        res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                    }
                });
            }
        })

    }

};