const mongoose = require('mongoose')

const ProductModalSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: [true, 'must provide product name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  rating: {
    type: Number,
    required: [true, 'must provide rating'],
  },
  price: {
    type: Number,
    required: [true, 'must provide price'],
  },
  description: {
    type: String,
    required: [true, 'must provide product description'],
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }, 
  images: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('ProductModal', ProductModalSchema)