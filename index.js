import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./config/Database.js";
import router from "./routes/index.js"

dotenv.config();

const app = express();

try {
    await db.authenticate();
    console.log('Connected to database');
} catch (error) {
    console.log(error)
}

app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(3000, ()=> console.log('Server running at port 3000'))