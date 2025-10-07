import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import requestRoutes from './routes/requestRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

connectDB();
app.get("/",(req,res)=>{
    res.send("Server is live!!!")
})

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/requests", requestRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>console.log(`server is running on port ${PORT}`));