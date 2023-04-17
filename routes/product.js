const express = require('express');
const router = express.Router()
const {getAllProducts, createProduct, singleProduct, editProduct, deleteProduct} = require('../controllers/product')

router.route('/').get(getAllProducts).post(createProduct);
router.route('/:id').get(singleProduct).patch(editProduct).delete(deleteProduct);

module.exports = router;