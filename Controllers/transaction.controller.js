const Transaction = require('../Models/transaction.model')
const Icon = require('../Models/icon.model');
const Category = require('../Models/category.model')
const asyncWrapper = require("../Middleware/async");

module.exports = {
    addTransaction:asyncWrapper(async (req, res, next) => {
        const transaction = new Transaction({
            wallet: req.body.wallet,
            amount: req.body.amount,
            category: req.body.category,
            date: req.body.date,
            note: req.body.note,
            user: req.body.user
        })
        await transaction.save(err => {
            if (err) {
                throw err
            }

            res.status(200).json({success: true, data: transaction})
        })
    }),
    listTransactionWallet: async (req, res, next) => {
        const transaction = await Transaction.find({user:req.body.user,wallet:req.body.wallet}).populate([{path: 'category'}, {
            path: 'wallet',
            populate: {path: 'icon'}
        }])
        res.json({success: true, data: transaction})
    },
    listTransactionUser: async (req, res, next) => {
        const list = await Transaction.find({user: req.body.user}).populate([{path: 'category'}, {
            path: 'wallet',
            populate: {path: 'icon'}
        }])
        res.json({success: true, data: list})
    },
    listCategory: async (req, res, next) => {
        const category = await Category.find();
        res.json({success: true, data: category})
    },
    listExpense: async (req, res, nex) => {
        const category = await Category.find({type: 'EXPENSE'})
        res.json({success: true, data: category})
    },
    listIncome: async (req, res, next) => {
        const category = await Category.find({type: 'INCOME'})
        res.json({success: true, data: category})
    },
    editTransaction: asyncWrapper(async (req, res, next) => {
        const transaction = {
            _id:req.body.id,
            wallet: req.body.wallet,
            amount: req.body.amount,
            category: req.body.category,
            date: req.body.date,
            note: req.body.note,
            user: req.body.user
        }
        await Transaction.findOneAndUpdate({_id: req.body.id}, transaction)
        res.json({success: true, data: transaction, msg: "Successfully Edit Transaction"})
    }),
    deleteTransaction: asyncWrapper(async (req, res, next) => {
        await Transaction.deleteOne({_id: req.body.id})
        res.json({success: true, msg: "Successfully Delete Transaction"})
    }),


}