const express = require("express")
const router = express.Router()
const {createParcel} = require("../Controllers/parcels")
const isAuth = require("../middlewares/middleware")

router.post("/parcel", isAuth, createParcel)


module.exports = router;
