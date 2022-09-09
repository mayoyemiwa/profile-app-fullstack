const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    age:{
        type:Number,
        default: 0
    },
    name: {
        type: String,
        required:[true, "This field can't be blank"]
    },
    email:{
        type: String,
        lowercase: true,
        unique: true,
        required:[true, "This field can't be blank"],
        index:true,
        validate: [isEmail, "invalid email"]
    },
    nationality:{
        type:String,
        default: 'Afghanistan'
    },
    changePwd:{
        type: String,
        required:[true, "This field can't be blank"]
    },
    picture:{
        type:String,
        default:"https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
    },
    sex:{
        type:String,
        default:'male'
    },
    status:{
        type:String,
        default: 'single'
    }
})

const UserProfile = mongoose.model('UserProfile', UserSchema)

module.exports = UserProfile;