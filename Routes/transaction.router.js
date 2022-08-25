const express=require('express')
const router=express.Router();
const transactionController=require('../Controllers/transaction.controller')

router.post('/add',transactionController.addTransaction)
router.get('/',transactionController.renderTransaction)
router.get('/category',transactionController.renderCategory)
router.get('/category/expense',transactionController.listExpense)
router.get('/category/income',transactionController.listIncome)

module.exports=router;