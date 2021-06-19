const User = require("../models/usersModel");

const roles = require("../../static/roles")

module.exports = {
    can(action){
        return async function(req, res, next){

            const { id } = req.headers

            // Get user from database
            const user = await User.findById(id).exec()

            // // if no user in db
            if (!user) return res.status(400).json({msg:"Looks like you are not registered yet"})

            // // check if user role can use route
            if (roles[user.role][action]){
                // moving on
                next()
                return
            }

            res.status(403).json({msg: "You dont have enough permissions to use this route"})
            
        }
    }
}