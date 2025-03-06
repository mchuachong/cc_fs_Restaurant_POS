import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './APIroutes/apiRoutes.js';
import {sql} from './config/db.js'
import path from "path"

const app = express();
dotenv.config();

app.use (helmet());
app.use (morgan("dev"));
app.use (express.json());
app.use (cors());

const PORT = process.env.PORT || 3000;
const __dirname =path.resolve()

app.use("/api",apiRoutes)

const initDB = async() => {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS "products" (
                product_id SERIAL PRIMARY KEY,
                product_name VARCHAR(255) NOT NULL UNIQUE,
                product_image VARCHAR(255),
                product_price DECIMAL(10,2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`;
        await sql`
            CREATE TABLE IF NOT EXISTS "users" (
                user_id SERIAL PRIMARY KEY,
                user_name VARCHAR(255) NOT NULL UNIQUE,
                user_image VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`;
        await sql`
            CREATE TABLE IF NOT EXISTS "orders" (
                order_id SERIAL PRIMARY KEY,
                product_id INTEGER REFERENCES products(product_id),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`;
        await sql`
            CREATE TABLE IF NOT EXISTS "tables" (
                table_id SERIAL PRIMARY KEY,
                table_name VARCHAR(255) NOT NULL UNIQUE,
                order_id INTEGER REFERENCES orders(order_id)
            )
        `
        
    }
    catch{
        console.log("error initDB")
    }
}
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,`/cc-pos-frontend/dist`)))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"cc-pos-frontend","dist","index.html"))
    })
}

initDB().then(()=>{
    console.log("Database Initialized")
    app.listen(PORT, ()=>{
        console.log(`server is running on port ${PORT}`)
    })
})