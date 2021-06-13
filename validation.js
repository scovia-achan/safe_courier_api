const Joi = require("joi")

const validateUser = (data)=>{ 
    
    const userSchema = Joi.object.keys({
        firstName: Joi.string().min(3).max(15).required(),
        lastName: Joi.string().min(3).max(15).required(),
        email: Joi.string().email().max(50).required(),
        password: Joi.string().min(3).max(50),
        password2: Joi.any().valid(Joi.ref("password")).required().options({language:{any:{allowOnly: "Passwords must match"}}})
    })

    return userSchema.validate(data)
}

const ValidateParcel = (parcel)=>{
    const parcelSchema = Joi.object.keys({
        parcelname: Joi.string().min(3).max(50).required(),
        weight: Joi.number(),
        currentLocation: String,
        destination: Joi.string().required(),
        status: Joi.string().max(15)
    })
    return parcelSchema.validate(parcel)
}

module.exports = {validateUser, ValidateParcel}