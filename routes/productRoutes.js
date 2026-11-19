
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

export default route;
