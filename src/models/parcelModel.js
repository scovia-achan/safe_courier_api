const mongoose = require("mongoose")

const ParcelSchema = new mongoose.Schema({
    parcelname: {type:String, required:true},
    weight: {type:Number, required:true},
    userLocation: {type:String, required: true},
    destination: {type:String, required:true},
    currentLocation: {type:String},
    status: {type:String, default: "submitted"}
   
    
})
module.exports = mongoose.model("Parcel", ParcelSchema)