import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rationsRoutes from './routes/rations.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json()); 


app.use('/api', rationsRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
