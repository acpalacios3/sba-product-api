// configure our environment variables 
import 'dotenv/config';
import e from 'express';
import { connectDB } from './db/connection.js';
import route from './routes/productRoutes.js';


const app = e();
const port = 3000;

// Middleware to parse JSON
app.use(e.json());

// register product routes
app.use('/api/products',route);


// Handle 404 Not Found
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found**'
    });
});

// In server.js, require and execute your database connection.
connectDB();

//start server
app.listen(port, () => {
    
    console.log('Server running on port: ' + port);
})

