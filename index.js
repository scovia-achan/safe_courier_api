const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const userRoute = require("./Routes/userRoutes")
const parcelRoute = require("./Routes/parcelRoutes")
const app = express()

app.use(cookieParser())

dotenv.config()


mongoose.connect(process.env.DATABASE, 
{useUnifiedTopology:true, useNewUrlParser:true, useCreateIndex:true},()=>{
    console.log("database connected")
})

app.use(express.json())
app.get("/", (req,res)=>{
    res.send("<h1>Welcome to safe Courier</h1>")
})
app.use("/api/v1/user", userRoute)
app.use("/api/v1/", parcelRoute)


app.listen(process.env.PORT || 8090, ()=>{console.log(`App running on port ${port}`)})