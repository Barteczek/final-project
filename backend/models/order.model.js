const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: { type: String },
  surname: { type: String },
  email: { type: String },
  mobile: { type: String },
  subtotal: { type: Number },
  cart: { type: Array },
});

module.exports = mongoose.model('Order', orderSchema);
