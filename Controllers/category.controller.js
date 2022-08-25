const Category = require('../Models/category.model')

module.exports = {
    showListCategory: async (req, res) => {
        data = await Category.find()
        res.status(200).json({success: true, data})
    },

    addCategory: async (req, res) => {
        const {type, name, icon} = req.body;
        if (!type || !name || !icon)
            return res.status(400).json({success: false, message: 'invalid'})
        try {
            const newCategory = new Category({
                type,
                name,
                icon
            })
            await newCategory.save()
            res.status(200).json({success: true, message: 'them moi thanh cong'})
        } catch (err) {
            console.log(err)
            res.status(401).json({success: false, message: 'them khong thanh cong'})
        }
    },

    updateCategory: async (req, res) => {
        const {type, name, icon} = req.body;
        if (!type || !name || !icon)
            return res.status(400).json({success: false, message: 'invalid'})
        try {
            await Category.updateOne({_id: req.params.id}, {
                type: type,
                name: name,
                icon: icon
            })
            res.status(200).json({success: true, message: 'update thanh cong'})
        } catch (err) {
            console.log(err)
            res.status(401).json({success: false, message: 'update khong thanh cong'})
        }
    },

    deleteCategory: async (req,res) => {
        const deleteId = req.params.id;
        if (!deleteId)
            return res.status(400).json({succes: false, message: 'khong ton tai category'});
        try {
            await Category.deleteOne({_id:deleteId})
            res.status(200).json({success: true, message: 'xoa thanh cong'})
        } catch (err) {
            console.log(err)
            res.status(401).json({success: false, message: 'xoa khong thanh cong'})
        }
    }


}