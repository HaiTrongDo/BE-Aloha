const Category = require('../Models/category.model')
const asyncWrapper = require("../Middleware/async");
module.exports = {
    showListCategory: asyncWrapper(async (req, res) => {
        const data = await Category.find()
        res.status(200).json({success: true, data})
    }),

    addCategory: async (req, res) => {
        const {type, name, icon} = req.body;

        if (type === '' || name === '' || icon === '')
            return res.status(400).json({success: false, message: 'invalid'})
        try {
            const newCategory = new Category({
                type,
                name,
                icon
            })
            await newCategory.save()
            data = await Category.find()
            res.status(200).json({success: true, message: 'them moi thanh cong', data})
        } catch (err) {
            console.log(err)
            res.status(401).json({success: false, message: 'them khong thanh cong'})
        }
    },

    updateCategory: async (req, res) => {
        const {id, type, name, icon} = req.body;
        console.log(req.body.id)
        if (!type || !name || !icon)
            return res.status(400).json({success: false, message: 'invalid'})
        try {
            await Category.updateOne({_id: id}, {
                type: type,
                name: name,
                icon: icon
            })
            data = await Category.find()
            res.status(200).json({success: true, message: 'update thanh cong', data})
        } catch (err) {
            console.log(err)
            res.status(401).json({success: false, message: 'update khong thanh cong'})
        }
    },

    deleteCategory: async (req, res) => {
        const deleteId = req.body.id;
        console.log(deleteId)
        console.log(req.body)
        if (!deleteId)
            return res.status(400).json({succes: false, message: 'khong ton tai category'});
        try {
            await Category.findByIdAndRemove({_id: deleteId})
            data = await Category.find()
            res.status(200).json({success: true, message: 'xoa thanh cong',data})
        } catch (err) {
            console.log(err)
            res.status(401).json({success: false, message: 'xoa khong thanh cong'})
        }
    }


}