
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

        // findByIdAndUpdate(): finds the product and updates it.
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

// DELETE /api/products/:id (Delete a Product)
// Deletes a product by its _id.
// If successful, responds with a success message.
// If no product is found to delete, responds with a 404 status code.
// Test:  http://localhost:3000/api/products/delete/6afe6367b666a0026f9ebf8b

route.delete('/delete/:id', async (req, res) => {

    try {
        // req.params.id : gets the ID from the URL.
        const id = req.params.id;

        // findByIdAndDelete: look for and delete the product
        const deleteProduct = await Product.findByIdAndDelete(id);

        if (!deleteProduct) {

            return res.status(404).json({
                message: 'Product not found to delete'
            });
        }
        console.log('Successfully deleted a product');
        // Correctly finds a product by ID and deletes it. Returns a confirmation message.
        res.status(200).json({
            message: 'Product successfully deleted',
            deleteProduct: deleteProduct
        });

    } catch(err) {

        console.error('Could not delete product', err);
        res.status(400).json({ error: 'Failed to delete product', details: err.message });
    }

})

// GET /api/products (Read All Products with Advanced Querying)
// This is the most complex endpoint. It should retrieve all products but also support the following optional query parameters:
// category: Filter products by a specific category.
// minPrice: Filter products with a price greater than or equal to this value.
// maxPrice: Filter products with a price less than or equal to this value.
// sortBy: Sort results. price_asc for ascending price or price_desc for descending price.
// page & limit: For pagination (defaulting to page 1, limit 10).
// Dynamically build the Mongoose query based on which query parameters are provided.
// Respond with an array of the resulting products.


// Test:
//  http://localhost:3000/api/products/query?category=Electronics&minPrice=100&maxPrice=600
//  http://localhost:3000/api/products/query?category=Electronics&minPrice=100&maxPrice=1000&sortBy=price_asc
//  http://localhost:3000/api/products/query?category=Electronics&minPrice=100&maxPrice=1000&sortBy=price_desc
//  http://localhost:3000/api/products/query?category=Electronics&minPrice=100&maxPrice=1000&sortBy=price_asc&page=1&limit=10
//  http://localhost:3000/api/products/query?category=Electronics&minPrice=100&maxPrice=1000&sortBy=price_asc&page=1&limit=5

route.get('/query', async (req, res) => {
    try {

        // In Express.js, req.query is a property of the request object (req) that returns an object 
        // with the query parameters present in the HTTP request URL
        const category = req.query.category || "";
        const minPrice = req.query.minPrice || 1;
        const maxPrice = req.query.maxPrice || 4000;
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;

        //  sort -1 from highest to lowest
        //  sort 1 from smallest to largest
        const sortBy = req.query.sortBy == 'price_desc' ? -1 : 1;

        //  $gte: greater than or equal and $lte: less than or equal
        const response = await Product.find({
            category: category,
            price: { $gte: minPrice, $lte: maxPrice }
        })
            .sort({ price: sortBy })

            // page:    The page number you want to retrieve.
            // limit:   The number of products per page.
            // .skip(): Indicates how many documents to skip.
            .skip((page-1) *limit)

            // .limit():Indicates how many documents to retrieve.
            .limit(limit)

            .select({ name: 1, category: 1 ,price: 1 });

        console.log('successfully retrieved products');

        // res.json(response) =====> return JSON
        // res.status(200).json(response) ====> Sets HTTP 200 and returns JSON.
        res.status(200).json(response)

    } catch (err) {
        console.error('failed to retrieve products:', err);
        res.status(400).json({ error: 'failed to fetch products', details: err.message });
    }
});

// GET /api/products/:id (Read a Single Product)
// Retrieves a single product by its _id.
// If the product is found, responds with the product object.
// If no product is found, responds with a 404 status code.
// Test:   http://localhost:3000/api/products/6afe6367b666a0026f9ebf8b

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
