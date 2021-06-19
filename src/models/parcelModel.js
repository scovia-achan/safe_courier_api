const mongoose = require("mongoose")

const ParcelSchema = new mongoose.Schema({
    parcelname: {type:String, required:true},
    weight: {type:Number, required:true},
    currentLocation: {type:String, required:true},
    destination: {type:String, required:true},
    status: {type:String}
    
})
module.exports = mongoose.model("Parcel", ParcelSchema)