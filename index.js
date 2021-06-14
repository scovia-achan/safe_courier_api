const express = require("express")
const mongoose = require("mongoose")
const userRoute = require("./Routes/allroutes")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const app = express()

app.use(cookieParser())

dotenv.config()
const port = 8090

mongoose.connect(process.env.DATABASE, 
{useUnifiedTopology:true, useNewUrlParser:true, useCreateIndex:true},()=>{
    console.log("database connected")
})

app.use(express.json())

app.use("/api/v1/user", userRoute)


app.listen(port, ()=>{console.log(`App running on port ${port}`)})