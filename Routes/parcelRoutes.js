const express = require("express")
const router = express.Router()
const {createParcel} = require("../Controllers/parcels")

router.post("/parcel", createParcel)


module.exports = router
