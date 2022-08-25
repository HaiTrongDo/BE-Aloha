const express=require('express')
const router=express.Router();
const transactionController=require('../Controllers/transaction.controller')

router.post('/add',transactionController.addTransaction)
router.get('/',transactionController.renderTransaction)
router.get('/category',transactionController.renderCategory)

module.exports=router;