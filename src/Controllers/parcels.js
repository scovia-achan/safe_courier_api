const mongoose = require("mongoose")
const Parcel = require("../models/parcelModel");
const User = require("../models/usersModel");


exports.createParcel = async (req, res) => {
  const sender = User.findById({_id: req.headers.id})
  const parcel = new Parcel({
    parcelname: req.body.parcelname,
    weight: req.body.weight,
    userLocation: req.body.userLocation,
    destination: req.body.destination,
    currentLocation: req.body.currentLocation,
    status: req.body.status,
    sender: {id: sender._id, name: sender.firstName}
  });

  parcel
    .save()
    .then((parcel) => {
      res
        .status(200)
        .send(`parcel will be delivered to ${parcel.destination}`);
    })
    .catch((err) => {
        console.log(err)
        res.send(err)
    })
};

exports.getParcels = (req, res) =>{
  Parcel.find({}, (err, result)=>{
    if(err){
      console.log(err)
    }
    else{
      res.send(result)
    }
  })
}

// get a parcel by ID
exports.getOneParcel = async(req, res) => {
  let parcelId = req.params.id;
  Parcel.findById(parcelId, function(err, result){
    if(err){
      console.log(err)
      res.status(404).send({err: "Parcel not found"})
    }
    else{
      res.send(result)
    }
  })
}

// User can change the location of a parcel
exports.updateDestination = async (req, res) => {
  try {
    const parcelId = req.params.id
    const destination = req.body.destination
    const result = await Parcel.findOneAndUpdate(parcelId, destination)
    res.send(result)

  }catch(err){
    console.log(err)
  }  

}

exports.updateStatus = async (req, res) => {
  try {
    const parcelId = req.params.id
    const status = req.body.status
    const result = await Parcel.findOneAndUpdate(parcelId, status)
    res.send(result)

  }catch(err){
    console.log(err)
  }  

}

exports.presentLocation = async (req, res) => {
  try {
    const {id:_id} = req.params
    parcelLocation = req.body
    if(!mongoose.Types.ObjectId.isValid(_id)){
      res.status(404).send("Parcel not found")
    }
    Parcel.findByIdAndUpdate(_id, {$set: parcelLocation}, {upsert:true, new: true}, (err, result)=>{
      if (err){
        res.status(403).send(err)
      }else {
        res.status(200).send(result)
      }
    })
    

  }catch(err){
    console.log(err)
  }  

}
  
