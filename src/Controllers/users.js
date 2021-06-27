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

// create Token
const maxAge=1*24*60*60
const createToken = (id) =>{
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: maxAge
  })
}

// create a new user
exports.createUsers = async (req, res) => {
  
  
  const user1 = new User(req.body);

  if (user1.password != user1.password2){
    return res.status(400).json({ message: "Password don't Match!" });
  }
  
  //   check if email already exists
  
  const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).json({ msg: "email already exists" });

    
  // Hash user password
 

  user1
    .save()
    .then(user1=>{
     const token = createToken(user1._id)
     res.cookie('jwt', token, {maxAge:maxAge*1000})
     res.status(201).json(user1._id)

    })
    .catch(err=>{
      const errors = handleErrors(err)
      res.status(400).json({errors})
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
  res.status(200).json({id: isUser._id, firstName: isUser.firstName})
};

exports.logout = async(req, res)=>{
  res.cookie("jwt","", {maxAge: 1})
  res.send("user logged out")
}
