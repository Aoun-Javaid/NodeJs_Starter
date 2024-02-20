const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  // Add more fields as per your product requirements
});
// console.log('em here in modal')
module.exports = mongoose.model('products', productSchema);