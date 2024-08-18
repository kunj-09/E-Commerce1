import dotenv from 'dotenv';
import express from 'express'
import colors from "colors"
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from'./routes/categoryRoutes.js';
import cors from 'cors';                      //cors is used to  enables secure communication between clients and servers in web applications.
import productRoutes from './routes/productRoutes.js'

//configure env
dotenv.config();

//database config
connectDB();


//rest object 
const app = express();

//middleware
app.use(express.json())     // req or res me ab apan json data bhi bhej sakte hai - yeh feature express me inBuilt hai abhi 
app.use(morgan('dev')) 
app.use(cors())   
 
//routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/products',productRoutes)

//rest api
app.get('/',(req,res)=>{
    res.send(`<h1>Welcome to ecommerce app</h1>`);
})
//Port
const PORT= process.env.PORT || 8080;

//run listen
app.listen(PORT,()=>{
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white)
})