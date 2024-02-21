// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Create a new product
router.post('/create-product', async (req, res) => {
  try {
    const { name, price } = req.body;
    const newProduct = await Product.create({ name, price });
    res.json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Get all products
router.get('/get-products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Update a product by ID
router.put('/update-product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(id, { name, price }, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a product by ID
router.delete('/delete-product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.send('Product deleted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
