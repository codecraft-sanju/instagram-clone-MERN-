import express from "express";
import dotenv from "dotenv";
import cookieparser from 'cookie-parser';
import cors from "cors";
import { connectDb } from "./database/db.js";

const app = express();
const PORT = 5000;
dotenv.config();


// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieparser());

// server 
app.listen(PORT, () => {
    console.log(`Server is running on port no. ${PORT}`);
    connectDb();
})
