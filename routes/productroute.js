const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const productRoute = express();
productRoute.use(bodyParser.json());
productRoute.use(bodyParser.urlencoded({extended: true}));
productRoute.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null, path.join(__dirname, '../public/assets'), function(err, result){
            if(err)
            {
                throw err;
            }
        })
    },
    filename: function(req,file, cb){
        const name = Date.now()+ '-' + file.originalname;
        cb(null, name, function(err, result){
            if(err)
            {
                throw err;
            }
        });
    },
})

const upload = multer({storage: storage});
const productController = require('../controllers/productcontroller');
const ProductModal = require('../models/productmodal');

const getAllProducts = async (req, res) => {
    const Products = await ProductModal.find({})
    res.status(200).json({ Products })
}

const deleteProduct = asyncWrapper(async (req, res) => {
    const { id: productID } = req.params
    const product = await ProductModal.findOneAndDelete({ _id: productID})
    if (!product) {
        return next(createCustomError(`No Product with id : ${productID}`, 404))
    }
    res.status(200).json({ msg: "Product Deleted Successfully" })
})

productRoute.post('/', upload.single('images'), productController);
productRoute.delete('/:id', deleteProduct);
productRoute.get('/', getAllProducts);
module.exports = productRoute


