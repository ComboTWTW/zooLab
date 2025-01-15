import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import fs from 'fs';
import rationsRoutes from './routes/rations.js';
import faqRoutes from './routes/faq.js';
import cors from 'cors';
import calcRationPost from './routes/calcRationPost.js';
import placeOrder from './routes/placeOrder.js';
import auth from './routes/auth.js';
import deleteRation from './routes/dashborad/deleteRation.js';


dotenv.config(); 

const app = express();


const connection = mysql.createConnection({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,  
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME,  
  port: process.env.DB_PORT, 
  ssl: {
    ca: fs.readFileSync('./server/certs/ca.pem'),  // Path to CA certificate
  },
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to MySQL database!');
  }
});

app.use(cors()); // Enable cross-origin requests
app.use(express.json()); // Parse JSON request bodies

app.use('/api', rationsRoutes(connection));
app.use('/api', faqRoutes(connection));
app.use('/api', calcRationPost(connection));
app.use('/api', placeOrder(connection));
app.use('/api', auth(connection));
app.use('/api', deleteRation(connection));


// Start the server
app.listen(3308, () => {
  console.log('Backend server is running on http://localhost:3308');
});
