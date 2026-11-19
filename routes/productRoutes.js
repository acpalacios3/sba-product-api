
import express from "express";
import { Product } from "../models/Product.js";

const route = express.Router();
console.log('Product routes loaded');

// 1. POST /api/products (Create a Product)
// Creates a new product based on the req.body.
// Responds with the newly created product and a 201 status code.
// If validation fails, it should return a 400 status code with a descriptive error message.

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


export default route;
