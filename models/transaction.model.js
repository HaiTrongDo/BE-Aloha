const mongoose= require('mongoose')
const Schema = mongoose.Schema;

const TransactionSchema= new Schema({
    wallet:{
        type:String,
        ref:'wallet',
        require:true
    },
    amount:{
        type:Number,
        require:true
    },
    category:{
        type:String,
        ref:'category',
        require:true
    },
    date:{
        type:Date,
        require:true
    },
    note:{
        type:String,
        require:false
    }
})

module.exports=mongoose.model('transaction',TransactionSchema)