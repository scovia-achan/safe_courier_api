const express = require("express")
const app = express()
const mongoose = require("mongoose")

const port = 8090

mongoose.connect("mongodb+srv://scoviakelsy:scoviakelsy12@cluster0.ip7lx.mongodb.net/safeCourier?retryWrites=true&w=majority", 
{useUnifiedTopology:true, useNewUrlParser:true, useCreateIndex:true},()=>{
    console.log("database connected")
})

app.use(express.json())


app.listen(port, ()=>{console.log(`App running on port ${port}`)})