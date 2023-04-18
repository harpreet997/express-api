const ProductModal = require('../models/productmodal');
const url = require('url');



const addProduct = async (req, res) => {
    try {
        const newPath1 = `https://node-product-management.vercel.app/products/public/assets/`
        var q = url.parse(newPath1, true);
        console.log(q.host)
        const newPath2 = `https://${q.host}/products/public/assets/${req.file.filename}`
        
        var product = new ProductModal({
            productname: req.body.productname,
            rating: req.body.rating,
            price: req.body.price,
            description: req.body.description,
            images: newPath2
        })

        const productData = await product.save();
        res.status(201).send({success: true, data: productData})
    } catch (error) {
        res.status(400).send({success: false, msg: error.message})
    }
}



module.exports = addProduct;