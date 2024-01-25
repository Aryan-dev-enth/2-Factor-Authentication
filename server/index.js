import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import connectDb from './config/connectdb.js'
import userRoutes from './routes/userRoutes.js'

const app = express();
const port = process.env.PORT;
const db_url = process.env.DB_URL;

app.use(express.json());

app.use("/api/user", userRoutes);




app.use(cors());
connectDb(db_url);

app.listen(port, ()=>{
    
    console.log("Server running at ",port);
})