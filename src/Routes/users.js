const express = require("express")
const router = express.Router()
const {getAllUsers,createUsers, loginUser, logout} = require("../Controllers/users")
const {isAuth, checkPermissions} = require("../middlewares")


router.get("/", [checkPermissions.can("get_all_users"),getAllUsers])
router.post("/signup", createUsers)
router.post("/login",loginUser)
router.get("/logout", logout)


module.exports = router;