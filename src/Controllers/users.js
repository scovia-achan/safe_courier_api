const User = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// create Token
const maxAge=1*24*60*60
const createToken = (id) =>{
  return jwt.sign({id}, process.env.SECRET, {
    expiresIn: maxAge
  })
}

// create a new user
exports.createUsers = async (req, res) => {

  //   check if email already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).json({ msg: "email already exists" });

  // Hash user password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const hashedPassword2 = await bcrypt.hash(req.body.password2, salt);

  const user1 = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    role: req.body.role,
    password: hashedPassword,
    password2: hashedPassword2,
  });

  user1
    .save()
    .then(user1=>{
      const token = createToken(user1._id)
      res.cookie('jwt', token, {httpOnly:true,maxAge:maxAge*1000})
      res.status(200).json({user: user1._id})

    })
    .catch(err=>{
      console.log(err)
      res.status(400).json({err})
    })

  
};

exports.loginUser = async (req, res) => {

  // Check if user exists
  const isUser = await User.findOne({email:req.body.email})
  if (!isUser) return res.status(400).json({msg:"User doesn't exist"})

  // Check if password is correct
  const userPassword = await bcrypt.compare(req.body.password, isUser.password)
  if(!userPassword){
    return res.status(401).json({msg:"Password is wrong"})
  }
  const token = createToken(isUser._id)
  res.cookie('jwt', token, {httpOnly:true,maxAge:maxAge*1000})
  res.status(200).json({user: isUser._id})
};

exports.logout = async(req, res)=>{
  res.cookie("jwt","", {maxAge: 1})
  res.send("user logged out")
}