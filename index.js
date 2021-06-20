const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const users = require("./src/Routes/users")
const parcels = require("./src/Routes/parcels")
const cors = require("cors")
const app = express()

app.use(cors())


app.use(cookieParser())

dotenv.config()
port = process.env.PORT || 8090


mongoose.connect(process.env.DATABASE, 
{useUnifiedTopology:true, useNewUrlParser:true, useCreateIndex:true},()=>{
    console.log("database connected")
})

app.use(express.json())
app.get("/api/v1/", (req,res)=>{
    res.send("<h1>Welcome to safe Courier</h1>")
})
app.use("/api/v1/user", users)
app.use("/api/v1/", parcels)


app.listen(port, ()=>{console.log(`App running on port ${port}`)})