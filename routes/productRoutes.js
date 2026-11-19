
import express from "express";
import { Product } from "../models/Product.js";

const route = express.Router();
console.log('Product routes loaded');

// 1. POST /api/products (Create a Product)
// Creates a new product based on the req.body.
// Responds with the newly created product and a 201 status code.
// If validation fails, it should return a 400 status code with a descriptive error message.
// Test:http://localhost:3000/api/products

route.post('/', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        console.log('successfully created a product');
        res.status(201).json(newProduct);

    } catch (err) {
        console.error('failed to create a new product:', err);
        res.status(400).json({
            error: 'could not create product',
            details: err.message
        });
    }
});


// GET /api/products/:id (Read a Single Product)
// Retrieves a single product by its _id.
// If the product is found, responds with the product object.
// If no product is found, responds with a 404 status code.
Test:   http://localhost:3000/api/products/6afe6367b666a0026f9ebf8b

route.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(req.params);

        const singleProduct = await Product.findById(id);

        if (!singleProduct) {
            return res.status(404).json({
                error: 'Product not found'
            });

        }
        console.log('successfully retrieved a product');
        res.status(200).json(singleProduct);

    } catch (err) {
        console.error('failed to retrieve Single product', err);
        res.status(400).json({ error: 'cannot retrieve a product', details: err.message });
    }
})


// PUT /api/products/:id (Update a Product)
// Updates a product by its _id with the data from req.body.
// Responds with the updated product data (use the { new: true } option).
// If no product is found to update, responds with a 404 status code.

// Test: http://localhost:3000/api/products/6afe6367b666a0026f9ebf8b
//  http://localhost:3000/api/products/507f1f77bcf86cd799439011  product does not exist

route.put('/:id', async (req, res) => {

    try {
        // req.params.id : gets the ID from the URL.
        const id = req.params.id;
        const body = req.body;

        // findByIdAndUpdate(): finds the book and updates it.
        // returnDocument: 'after' : returns the document after updating it.
        const updateProduct = await Product.findByIdAndUpdate(id, body, { returnDocument: 'after' });

        // check if the product exists,provided that the ID has a valid format 
        if (!updateProduct) {
            return res.status(404).json({
                error: 'Product not found to update'
            });
        }
        console.log('successfully updated a product');

        // 200 (successful operation)
        res.status(200).json(updateProduct);

    } catch (err) {
        console.error('Could not update product:', err);
        // 400 (Bad Request)
        res.status(400).json({ error: 'failed to update product', details: err.message });
    }

});

export default route;
