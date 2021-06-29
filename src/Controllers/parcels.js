const mongoose = require("mongoose");
const Parcel = require("../models/parcelModel");
const User = require("../models/usersModel");

// Create a parcel order
exports.createParcel = async (req, res) => {
  const parcel = new Parcel({
    parcelname: req.body.parcelname,
    weight: req.body.weight,
    userLocation: req.body.userLocation,
    destination: req.body.destination,
    currentLocation: req.body.currentLocation,
    status: req.body.status,
  });

  parcel
    .save()
    .then((parcel) => {
      res.status(200).send(`parcel will be delivered to ${parcel.destination}`);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

// Get all parcels
exports.getParcels = (req, res) => {
  Parcel.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

// get a parcel by ID
exports.getOneParcel = async (req, res) => {
  let parcelId = req.params.id;
  Parcel.findById(parcelId, function (err, result) {
    if (err) {
      console.log(err);
      res.status(404).send({ err: "Parcel not found" });
    } else {
      res.send(result);
    }
  });
};

// Get parcel created by user

// Change the current location of the parcel

exports.presentLocation = async (req, res) => {
  const id = req.params.id;
  // let currentLocation = req.body
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   res.status(404).json("Invalid ParcelId");
  // }
  Parcel.findOneAndUpdate(
    { _id: id },
    {
      destination: req.body.destination,
    },
    { new: true }
  )
    .then(() => {
      Parcel.findOne({ _id: id }).then((result) => res.send(result));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
        message: `There is an internal server error`,
      });
    });

  // update parcel status
  exports.updateStatus = async (req, res) => {
    const id = req.params.id;

    Parcel.findOneAndUpdate(
      { _id: id },
      {
        status: req.body.status,
      },
      { new: true }
    )
      .then(() => {
        Parcel.findOne({ _id: id }).then((result) => res.send(result));
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
          message: `There is an internal server error`,
        });
      });
  };

  // Delete parcel

  exports.deleteParcel = async (req, res) => {
    try {
      const id = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send("Parcel doesn't exist");
      }
      await Parcel.findByIdAndRemove(id);
      res.send({ msg: "book deleted" });
    } catch (err) {
      console.log(err);
      res.status(404).send("Parcel not found");
    }
  };
};
