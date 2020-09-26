const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  text: { type: String },
  images: { type: Array },
});

module.exports = mongoose.model('Product', productSchema);
