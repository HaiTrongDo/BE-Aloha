const Icon = require('../Models/icon.model');
const Currency = require('../Models/currency.model');
const Wallet = require('../Models/wallet.model');

module.exports = {
    addWallet: async (req, res, next) => {
        console.log(req.body)
        const book = new Wallet({
            icon: req.body.icon,
            name: req.body.name,
            initial: req.body.initial,
            currency: req.body.currency,
        })
        await book.save(err => {
            if (err) {
                return res.json({success: false, msg: err.message});
            }
            res.json({success: true, msg: 'Successful created new wallet.'});
        });
    },
    renderWallet: async (req, res, next) => {
        let wallets = await Wallet.find().populate([{path:'icon',select:['name','url']},{path:'currency',select:['name','url','code']}])
        res.json({success: true,data:wallets})
    },
}
