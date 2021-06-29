const User = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// errors
const handleErrors = (err) =>{
  console.log(err.message)
  let errors = {email: "", password: ""}
  // validation errors
  if(err.message.includes("User validation failed")){
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path]=properties.message
    })
  }
  return errors

}

// get all users
exports.getAllUsers = (req, res) =>{
  User.find({}, (err, result)=>{
    if(err){
      console.log(err)
    }
    else{
      res.send(result)
    }
  })
}

// create a new user
exports.createUsers = async (req, res) => {
  
  
  const {firstName, lastName, email, role, password} = req.body;

  //   check if email already exists
  const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).json({ msg: "email already exists" });


  try{
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)
    user1 = await new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: role,
      password: hashedPassword
    })
    const user = await user1.save()
    res.json({
      msg: "signed up",
      user: user
    })
    
  }
   
  catch(err){
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }

  
};

exports.loginUser = async (req, res) => {
  
  
  // Check if user exists
  const isUser = await User.findOne({email:req.body.email})
  if (!isUser) return res.status(400).json({msg:"User doesn't exist"})
  
  try{
  // Check if password is correct
    const userPassword = await bcrypt.compare(req.body.password, isUser.password)
    if(!userPassword){
      return res.status(401).json({msg:"Password is wrong"})
    }
    const token = jwt.sign(
      {userId: isUser._id, email: isUser.email, firstname: isUser.firstName}, 
      process.env.SECRET, 
      {expiresIn: "6h"}
      
    )
    res.header("verified-token", token)
    res.status(200).json({token: token, userId: isUser._id, role: isUser.role})
  } 
  catch(err){
    console.log(err)
    res.status(500).json("cannot login")
  }
};

exports.logout = async(req, res)=>{
  res.cookie("jwt","", {maxAge: 1})
  res.send("user logged out")
}
