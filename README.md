## SBA Build a Product API

## Description
"You are a backend developer at "Zenith," an e-commerce company. The company requires a robust and scalable API to manage its product inventory. This API will be used both by internal inventory management tools and by the public-facing website to display products to customers.

The project involves designing and building this RESTful API from scratch, using Node.js, Express, and Mongoose. The API handles all fundamental CRUD operations and includes advanced features—such as filtering, sorting, and pagination—to manage a product catalog."

## Technologies:

* Node.js – JavaScript runtime environment.
* Express.js – Web framework for building RESTful APIs.
* MongoDB – NoSQL database for storing product information.
* Mongoose – ODM library for modeling MongoDB documents.
* dotenv – Manages environment variables.
* Postman – Used to test API endpoints and HTTP responses.

## Features

* Create a new product.
* Retrieve all products.
* Retrieve a single product by ID.
* Update an existing product.
* Delete a product.
* Filter products by category.
* Filter products by minimum and maximum price.
* Sort products by price in ascending or descending order.
* Implement pagination using page and limit query parameters.


## Installation and Setup

1. Install dependencies
npm install

2. Configure environment variables
Create a .env file in the root directory:
PORT=3000
MONGODB_URI=your_mongodb_connection_string

Replace the connection string with your MongoDB connection URI.
3. Start the server
node server.js

4. The API will run at:
http://localhost:3000

## Testing

Postman was used to test the API endpoints and verify:

1. **POST:**
http://localhost:3000/api/products 
Successful product creation.

Retrieving products from MongoDB.

2. **PUT:** 
http://localhost:3000/api/products/6afe6367b666a0026f9ebf8b  Updating existing product information.
http://localhost:3000/api/products/507f1f77bcf86cd799439011  product does not exist


3. **DELETE:**
http://localhost:3000/api/products/delete/6afe6367b666a0026f9ebf8b  Deleting products with id


4. **GET /api/products (Read All Products with Advanced Querying)**

Filtering products by category and price:
http://localhost:3000/api/products/query?category=Electronics&minPrice=100&maxPrice=600

Sorting products in ascending and descending order:
http://localhost:3000/api/products/query?category=Electronics&minPrice=100&maxPrice=1000&sortBy=price_asc
http://localhost:3000/api/products/query?category=Electronics&minPrice=100&maxPrice=1000&sortBy=price_desc


5. **Pagination using page and limit:**
http://localhost:3000/api/products/query?category=Electronics&minPrice=100&maxPrice=1000&sortBy=price_asc&page=1&limit=10

http://localhost:3000/api/products/query?category=Electronics&minPrice=100&maxPrice=1000&sortBy=price_asc&page=1&limit=5


6. **GET /api/products/:id (Read a Single Product)**1.
 http://localhost:3000/api/products/6afe6367b666a0026f9ebf8b

## HTTP Status Codes

200 OK – Request completed successfully
201 Created – Product successfully created
400 Bad Request – Invalid request or data
404 Not Found – Product or route not found
500 Internal Server Error – Server error
