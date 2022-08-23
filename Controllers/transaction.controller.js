const Transaction = require('../Models/transaction.model')
const Icon = require('../Models/icon.model')

module.exports={
    addTransaction: async(req,res,next)=>{
        const transaction= new Transaction({
            wallet:req.body.wallet,
            amount:req.body.amount,
            category:req.body.category,
            date:new Date().toLocaleDateString(),
            note:req.body.note
        })
        await transaction.save(err => {
            if(err){
                throw err
            }
            res.status(200).json({success:true,data:transaction})
        })
    },
    renderTransaction: async (req,res,next)=>{
        const transaction = await Transaction.find()
        res.json({success:true,data:transaction})
    }
}