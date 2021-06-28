const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const users = require("./src/Routes/users")
const parcels = require("./src/Routes/parcels")
const cors = require("cors")


const app = express()

// middleware
app.use(cors({
    origin:"https://sefcourier.netlify.app/",
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())

dotenv.config()
port = process.env.PORT || 8090


mongoose.connect(process.env.DATABASE, 
{useUnifiedTopology:true, useNewUrlParser:true, useCreateIndex:true, useFindAndModify:false},()=>{
    console.log("database connected")
})


app.get("/api/v1/", (req,res)=>{
    res.send("<h1>Welcome to safe Courier</h1>")
})



app.use("/api/v1/user", users)
app.use("/api/v1/", parcels)


app.listen(port, ()=>{console.log(`App running on port ${port}`)})