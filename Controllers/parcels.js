const Parcel = require("../models/parcelModel")
const User = require("../models/usersModel")

exports.createParcel = async(req, res) =>{
    const parcel = new Parcel(req.body)

    parcel
        .save()
        .then(parcel=>{
            res.send("parcel sent")
        })
        .catch(err=>console.log(err))

}