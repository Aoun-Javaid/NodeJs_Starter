const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// console.log('em here in controller')
// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
// set products
router.post('/products', async (req, res) => {
  console.log("req Body======", req.body);
  try {
    const newProduct = new Product(req.body);
    // 
   const saveResponse = await newProduct.save();
  //  console.log(saveResponse);return;
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ error: 'Bad request' });
  }
});
// Get a single product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Delete by id
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await Product.deleteOne({ _id: req.params.id }); // Delete the product from the database
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Update using patch by id
router.patch('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await Product.updateOne({ _id: req.params.id }, req.body); 
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;