const express = require("express")
const router = express.Router()
const {createParcel, getParcels, getOneParcel} = require("../Controllers/parcels")
const isAuth = require("../middlewares/middleware")

router.post("/parcel", createParcel)
router.get("/parcel", getParcels)
router.get("/parcel/:id", getOneParcel)


module.exports = router;
