const express=require('express')
const mongoose=require("mongoose")
const dotenv=require('dotenv').config()
const cors=require('cors')
const authController = require('./controllers/authController')
const propertyController = require('./controllers/propertyController')
const uploadController=require('./controllers/uploadController')
const app=express()

//mongodb connect
mongoose.set('strictQuery',false);
mongoose.connect(process.env.MONGO_URL, ()=>console.log("mongo succefuoll"));
app.use('/files', express.static('public/images'))

// http://localhost:5000/images/safsfkaefk

//route and middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/auth", authController)
app.use("/property", propertyController)
app.use("/upload", uploadController)

//starting server
app.listen(process.env.PORT,()=>console.log('server has been started successfully '))