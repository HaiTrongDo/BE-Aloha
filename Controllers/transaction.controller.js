const Transaction = require('../Models/transaction.model')
const Icon = require('../Models/icon.model');
const Category = require('../Models/category.model')
const asyncWrapper = require("../Middleware/async");
const mongoose = require("mongoose");

module.exports = {
    addTransaction: asyncWrapper(async (req, res, next) => {
        const transaction = new Transaction({
            wallet: req.body.wallet,
            amount: req.body.amount,
            category: req.body.category,
            date: req.body.date,
            note: req.body.note,
            user: req.body.user,
        })
        await transaction.save(err => {
            if (err) {
                throw err
            }

            res.status(200).json({success: true, data: transaction})
        })
    }),
    listTransactionWallet: async (req, res, next) => {
        const transaction = await Transaction.find({
            user: req.body.user,
            wallet: req.body.wallet
        }).populate([{path: 'category'}, {
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
            _id: req.body.id,
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
    sortTransactionByCategory: asyncWrapper(async (req, res, next) => {
        const result = await Transaction
            .aggregate()
            .lookup({
                from: 'category',
                localField: 'category._id',
                foreignField: '_id',
                as: 'asdasd'
            })
            .group({_id: '$category'})

        res.json({success: true, data: result})
    }),
    searchTransaction: asyncWrapper(async (req, res, nex) => {
        let search = {user: req.body.userId,}
        req.body?.wallet?.icon?._id && (search.wallet = req.body.wallet)
        req.body?.category?._id && (search.category._id = req.body.category._id)
        req.body?.note && (search.note = new RegExp(req.body.note, 'ig'))
        req.body?.date && (search.date = {
            $gte: new Date(req.body.date.split("->")[0]),
            $lt: new Date(req.body.date.split("->")[1])
        })
        const userTransResult = await Transaction
            .find(search)
            .populate([
                {path: 'category'},
                {
                    path: 'wallet', populate: {path: 'icon'}
                }])

        res.json({success: true, data: userTransResult})
    }),

    getLastMonthTransaction: asyncWrapper(async (req, res, next) => {

        const TestData = await Transaction
            .aggregate([
                {$match:{user:new mongoose.Types.ObjectId(req.body.userId) }}])
            .facet({
                transactionData:[ {$group:{
                        _id: {"date":"$date",
                            "category":"$category.type"},
                        total:{$sum:"$amount"},}}],
                dataPieChartExpense:[ {$group:{
                        _id:"$category.type",
                        total:{$sum:"$amount"},}}],
                // dataPieChartIncome:[ {$group:{
                //         _id:"$category",
                //         total:{$sum:"$amount"},}}]
            })


        console.log(TestData[0].transactionData);
        // console.log(TestData[0].dataPieChartExpense);
        // console.log(TestData[0].dataPieChartIncome);


        res.json({success: true, data: TestData})
    })

}



