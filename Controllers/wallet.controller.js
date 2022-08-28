const Icon = require('../Models/icon.model');
const Currency = require('../Models/currency.model');
const Wallet = require('../Models/wallet.model');
const asyncWrapper = require("../Middleware/async");

module.exports = {
    addWallet: asyncWrapper( async (req, res, next) => {
        const book = new Wallet({
            icon: req.body.icon,
            name: req.body.name,
            initial: req.body.initial,
            currency: req.body.currency,
            user: req.body.user
        })
        await book.save(err => {
            if (err) {
                return res.json({success: false, msg: err.message});
            }
            res.json({success: true, msg: 'Successful created new wallet.'});
        });
    }),

    renderWallet:asyncWrapper( async (req, res, next) => {
        let wallets = await Wallet.find({user:req.body.userId}).populate([{path:'icon',select:['name','url']},{path:'currency',select:['name','url','code']},{path:'user',select:['email']}])
        res.json({success: true,data:wallets})
    }),

    render: asyncWrapper( async (req, res, next) => {
        let wallets = await Wallet.find().populate([{path:'icon',select:['name','url']},{path:'currency',select:['name','url','code']},{path:'user',select:['email']}])
        res.json({success: true,data:wallets})
    }),

    getDetail:asyncWrapper( async (req,res)=>{
        let wallet = await Wallet.findOne({_id:req.body.walletId}).populate([{path:'icon',select:['name','url']},{path:'currency',select:['name','url','code']},{path:'user',select:['email']}])
        res.json({success: true,data:wallet})
    }),

    updateWallet:asyncWrapper( async (req,res)=>{
        const walletUpdateData = req.body.dataUpdateWallet
        console.log(walletUpdateData)
        let wallet = await Wallet.findOneAndUpdate({_id:walletUpdateData._id},walletUpdateData).populate([{path:'icon',select:['name','url']},{path:'currency',select:['name','url','code']},{path:'user',select:['email']}])
        res.json({success: true, msg: 'Successful update wallet.'});
    }),

    deleteWallet:asyncWrapper( async (req,res)=>{
        console.log(req.body)
        await Wallet.findOneAndRemove({_id:req.body.walletId}).populate([{path:'icon',select:['name','url']},{path:'currency',select:['name','url','code']},{path:'user',select:['email']}])
        res.json({success: true, msg: 'Successful delete wallet.'});    
    }),

}
