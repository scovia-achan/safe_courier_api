const User = require("../models/usersModel");
const { validateUser, ValidateParcel } = require("../validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// create a new user
exports.createUsers = async (req, res) => {
  // validating user input
  // const { error } = validateUser(req.body);
  // if (error) return res.status(400).send(error);

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
    password: hashedPassword,
    password2: hashedPassword2,
  });

  try {
    const saveUser = await user1.save();
    res.status(200).json({ userName: saveUser.firstName });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.loginUser = async (req, res) => {

  // const {email, password} = req.body;
  // Check if user exists
  const isUser = await User.findOne({email:req.body.email})
  if (!isUser) return res.status(400).json({msg:"User doesn't exist"})

  // Check if password is correct
  const userPassword = await bcrypt.compare(req.body.password, isUser.password)
  if(!userPassword){
    return res.status(401).json({msg:"Password is wrong"})
  }
  const token = jwt.sign({_id:isUser._id}, process.env.SECRET)
  res.cookie("nToken", token, {maxAge: 900000, httpOnly:true})
  res.header("auth-token",token).send(token)
};

// exports.logout = async(req, res)=>{

// }