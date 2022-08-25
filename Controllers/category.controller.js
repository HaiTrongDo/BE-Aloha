const Category = require('../Models/category.model')

module.exports = {
    showListCategory: async (req,res) => {
        data = await Category.find()
        res.status(200).json({success:true,data})
    }


}