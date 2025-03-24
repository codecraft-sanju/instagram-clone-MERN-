import express from 'express';
import dotenv from 'dotenv';
import cookieparser from 'cookie-parser';
import cors from 'cors';
import { connectDb } from './database/db.js';
import userRoute from './routes/userRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//  Fix: Show clear environment status
console.log(` Running in ${process.env.NODE_ENV} mode`);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieparser());

// Routes
app.use('/api', userRoute);

// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});
