const express = require("express")
const router = express.Router()
const {createUsers, loginUser, logout} = require("../Controllers/users")


router.post("/signup", createUsers)
router.post("/login", loginUser)
router.get("/logout", logout)



module.exports = router;