let User = require("../Models/user.model");
const asyncWrapper = require("../Middleware/async");

module.exports = {

    getCurrentUserInfo: asyncWrapper( async (req, res, next) =>{
        console.log(req.body);
        let getCurrentUserInfo = await User.findOne({_id: req.body.userId})
        console.log(getCurrentUserInfo);
        res.status(200).json(getCurrentUserInfo);
    }),

    updateProfile:asyncWrapper( async (req, res, next) =>{
        const {} = req.body
        let updateProfile = await User.findByIdAndUpdate(req.body.userId,{...req.body})
        res.status(200).json(updateProfile);
    })
}