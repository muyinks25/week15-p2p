// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const productRoutes = require('./routes/products');
const Product = require('./models/product');
dotenv.config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Function to seed products into MongoDB from a JSON file
const seedProductsFromJson = async () => {
  try {
    // Read data from db.json file
    const rawData = fs.readFileSync('./db.json');
    console.log('Raw Data from db.json:', rawData);
    const productsData = JSON.parse(rawData);

    // Insert products into MongoDB using the Mongoose model
    const insertedProducts = await Product.create(productsData);

    console.log('Products inserted into MongoDB:', insertedProducts);
  } catch (error) {
    console.error('Error seeding products from db.json:', error);
  }
};

// Call the seed function to insert products from db.json into the database
seedProductsFromJson();

// Mount your product routes
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
