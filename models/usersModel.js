const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    firstName: {type: String, required:true,},
    lastName: {type:string, required:true},
    email: {type:string, required:true},
    password: {type:string, required:true},
    password2: {type:string, required:true}

})

module.exports = mongoose.model("User", UserSchema)
