const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  const token = req.cookies.jwt;

  //
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodeToken) => {

      try{
				console.log(decodeToken);
      	next();
			}
			catch(err){
				console.log(err)
			}
      
    });
  } else {
    res.send("please login");
  }
  next();
};

module.exports=isAuth;

