const express = require("express")
const router = express.Router()
const {createUsers, loginUser, logout} = require("../Controllers/users")
const {createParcel} = require("../Controllers/parcels")

router.post("/register", createUsers)
router.post("/login", loginUser)
router.get("/logout", logout)

router.post("/parcel", createParcel)

module.exports = router;