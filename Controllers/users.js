import mongoose from "mongoose"
import User from "../models/usersModel"

// create a new user
export const createUsers = async(req, res) =>{
    const addUser = req.body
    let newuser = new User(addUser)

    try{
        let saveuser = await newuser.save();
        res.send({msg: "Account created successfully", yourName: saveuser.firstName})        
    }catch(err){
        console.log(err)
    }
}

// get all users 

// export const getusers = async(req, res) =>{
//     User.find({}, )
// }