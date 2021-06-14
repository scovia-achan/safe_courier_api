const express = require("express")
const router = express.Router()
const {createUsers, loginUser} = require("../Controllers/users")

router.post("/register", createUsers)
router.post("/login", loginUser)

module.exports = router;