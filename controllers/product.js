
const Product = require('../models/product');
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllProducts = asyncWrapper(async (req, res) => {
    const Products = await Product.find({})
    res.status(200).json({ Products })
})

const createProduct = asyncWrapper(async (req, res) => {
    const product = await Product.create(req.body)
    if (!product) {
        return next(createCustomError(`Please fill all the required fields`, 500))
    }
    else {
        res.status(201).json({ product })
    }
})

const singleProduct = async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id })
    res.json({ id: product })
}

const editProduct = asyncWrapper(async (req, res, next) => {
    const { id: productID } = req.params
    const product = await Product.findOneAndUpdate({ _id: productID }, req.body, {
        new: true,
        runValidators: true,
    })
    if (!product) {
        return next(createCustomError(`No Product with id : ${productID}`, 404))
    }
    else {
        res.status(200).json({ msg: "Product Updated Successfully" })
    }
})

const deleteProduct = asyncWrapper(async (req, res) => {
    const { id: productID } = req.params
    const product = await Product.findOneAndDelete({ _id: productID })
    if (!product) {
        return next(createCustomError(`No Product with id : ${productID}`, 404))
    }
    res.status(200).json({ msg: "Product Deleted Successfully" })
})

module.exports = {
    getAllProducts,
    createProduct,
    singleProduct,
    editProduct,
    deleteProduct
}