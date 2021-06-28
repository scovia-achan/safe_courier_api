const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  const token = req.header('verified-token');

  //
  if (!token) {
    return res.status(401).send("Cannot access resource, no token provided")
  } 

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    req.user= decodedToken
    next()
  }
  catch(err){
    res.status(400).send("Invalid token")
  }

}
module.exports=isAuth;

