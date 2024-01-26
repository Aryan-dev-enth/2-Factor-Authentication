import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import connectDb from './config/connectdb.js'
import userRoutes from './routes/userRoutes.js'

const app = express();
const port = process.env.PORT;
const db_url = process.env.DB_URL;

app.use(cors()); // Enable CORS at the beginning

app.use(express.json());

app.use("/api/user", userRoutes);

connectDb(db_url);

app.listen(port, () => {
    console.log("Server running at ", port);
});
