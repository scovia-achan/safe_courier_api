const Parcel = require("../models/parcelModel");
const User = require("../models/usersModel");

exports.createParcel = async (req, res) => {
  const parcel = new Parcel(req.body);

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

exports.getOneParcel = async(req, res) => {
  let parcelId = req.params.id;
  Parcel.findById(parcelId, function(err, result){
    if(err){
      console.log(err)
      res.send(err)
    }
    else{
      res.json(result)
    }
  })
}
  
