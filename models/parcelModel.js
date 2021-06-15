const mongoose = require("mongoose")

const ParcelSchema = new mongoose.Schema({
    parcelname: {type:String},
    weight: Number,
    currentLocation: String,
    destination: String,
    status: String
    
})
module.exports = mongoose.model("Parcel", ParcelSchema)