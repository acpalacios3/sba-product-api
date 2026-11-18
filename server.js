// configure our environment variables 
import 'dotenv/config';
import e from 'express';
import { connectDB } from './db/config.js';


const app = e();
const port = 3000;

// Middleware to parse JSON
app.use(e.json());

// In server.js, require and execute your database connection.
connectDB();

//start server
app.listen(port, () => {
    
    console.log('Server running on port: ' + port);
})

