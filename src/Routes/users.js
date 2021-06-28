const express = require("express")
const router = express.Router()
const {createUsers, loginUser, logout} = require("../Controllers/users")
const {isAuth} = require("../middlewares")



router.post("/signup", createUsers)
router.post("/login",loginUser)
router.get("/logout", logout)



module.exports = router;