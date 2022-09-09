const mongoose = require('mongoose');
const {isEmail} = require('validator');
// const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "This field can't be blank"],
        minLength:[3, "Minimum length is 3 characters"],
        maxLength:[16, "Maximum length is 16 characters"],
    },
    email:{
        type: String,
        lowercase: true,
        unique: true,
        required:[true, "This field can't be blank"],
        index:true,
        validate: [isEmail, "invalid email"]
    },
    pwd:{
        type:String,
        required:[true, "This field can't be blank"]
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User;