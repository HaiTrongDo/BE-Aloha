const mongoose= require('mongoose')
const Schema = mongoose.Schema;

const TransactionSchema= new Schema({
    wallet:{
        type:Schema.Types.ObjectId,
        ref:'Wallet',
        require:true
    },
    amount:{
        type:Number,
        require:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        require:true
    },
    date:{
        type:String,
        require:true
    },
    note:{
        type:String,
        require:false
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps: true})

module.exports=mongoose.model('Transaction',TransactionSchema)