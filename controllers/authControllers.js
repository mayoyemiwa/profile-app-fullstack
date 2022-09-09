const Users = require('../models/User');
const UserProfile = require('../models/UserProfile');
const jwt = require('jsonwebtoken');
const {handleErrors, sendMail} = require('../controllersFunctions/controllersFunction')
const bcrypt = require('bcrypt')



const {CLIENT_URL, ACTIVATION_TOKEN_SECRET} = process.env
module.exports.signup_post = async(req, res) => {
    const {name, email, pwd} = req.body.users;
    try{
       const nameValid = isValid(/^[A-Za-z0-9]{3,16}$/, name)
       if(!nameValid) return res.status(400).json({msg:"Name should be 3-16 characters and shouldn't include any special characters"});
       const pwdValid = isValid(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, pwd);
       if(!pwdValid) return res.status(400).json({msg:"Password should be 8-20 characters and should include at least a Uppercase letter, a Lowecase letter, a number and a Special character!"});
       const check = await Users.findOne({email})
       if(check) return res.status(400).json({msg:"email already exists"});

       const salt = await bcrypt.genSalt()
       const passwordHash = await bcrypt.hash(pwd, salt)
            
            const newUser = {
                name,
                email,
                pwd: passwordHash
            }

       const activation_token = createActivationToken(newUser)
            const url = `${CLIENT_URL}/user/activate/${activation_token}` 
            sendMail(email, url, "verify your email")

        res.json({msg:"Register Successfull! Please check your email to activate your account."})
    }
    catch(err){
        // console.log(err)
        res.staus(400).json({msg:err.message})
    } 
}
module.exports.activationEmail = async(req, res) => {
    const {activation_token} = req.body
    try{
        const user = await jwt.verify(activation_token, ACTIVATION_TOKEN_SECRET )
        const {name, email, pwd } = user;
        const check = await Users.findOne({email})
            if(check) return res.status(400).json({msg:"This email already exists."})
            const newUser = new Users({
                name, email, pwd
            })
            const newUser2 = new UserProfile({
                name, email, changePwd:pwd
            })
            await Users.create(newUser)
            await UserProfile.create(newUser2)
            res.status(201).json({msg:"You've successfully signed in."})
    }
    catch(err){
        // console.log("err", err.message)
        if(err.message === "invalid token" || err.message === "jwt expired") return res.status(400).json({msg:"Activation token has expired, please signup again"})
        const error = await handleErrors(err)
        res.status(400).json({msg:error.email})
    }
}
module.exports.login_post = async(req, res) => {
    const {email, pwd} = req.body.users2;
    try{
        const user = await Users.findOne({email})
        if(!user) return res.status(500).json({msg:"User doesn't exist, please signup"})
        const user2 = await UserProfile.findOne({email})
        if(!user2) return res.status(500).json({msg:"User doesn't exist, please signup"})
        const isMatch = await bcrypt.compare(pwd, user2.changePwd)
        if(!isMatch) return res.status(400).json({msg:"Password is incorrect"})

        const refresh_token = creatRefreshToken({user2})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path:'/user/api/refresh_token',
                maxAge: 7*24*60*60*1000 // 7 days
            })
            res.status(201).json({msg: "Login successfull! You can update your profile now"})
    }
    catch(err){
        res.status(500).json({msg: err.message})
    }
}
module.exports.getAccessToken = async(req, res) => {
    try{
        const rf_token = req.cookies.refreshtoken
        if(!rf_token) return res.status(400).json({msg:"Please login now"})

        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(400).json({msg:"Please login now"})

            const access_token = createAccessToken({id: user.id}) 
            res.json({access_token}) 
        })
    }
    catch(err){
        // console.log(err)
        return res.status(500).json({msg: err.message})
    }
}
module.exports.getAccessToProfile = async(req, res) => {
    const {token} = req.body;
    await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if(err) return res.status(400).json({msg:"Please login again"})
        res.status(201).json({msg:"verified"})
    })
}
module.exports.getUser = async(req, res) => {
    const {token} = req.body;
    const check = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    if(!check) return res.status(400).json({msg:"Please login again"})
    const user = await UserProfile.findOne({id:check.id})
    return res.status(201).json(user)

}
module.exports.profile_post = async(req, res) => {
    const {name, email, changePwd, age, status, sex, nationality, picture} = req.body.users;
    try{
        const pwdValid = isValid(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, changePwd)
        if(!pwdValid) return res.status(400).json({msg:"Password should be 8-20 characters and should include at least a Uppercase letter, a Lowecase letter, a number and a Special character!"});
        const check = await Users.findOne({email})
        if(!check)  return res.status(400).json({msg:"email does not exists, please Register"});

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(changePwd, salt)
            const newUser = {
                name,
                email,
                pwd: passwordHash
            }
            let newUser2
            if(picture === undefined)  newUser2 = {name, email, changePwd: passwordHash, age, sex, status, nationality}
            else newUser2 = {name, email, changePwd: passwordHash, age, sex, status, nationality, picture }
        const user = await Users.updateOne({email}, {...newUser})
        const user2 = await UserProfile.updateMany({email}, {...newUser2})
        if(user && user2) return res.status(201).json({msg:"MY PROFILE SUCCESSFULL FOR NOW"})
    }
    catch(err){
        // console.log({err})
        res.status(400).json({msg:err.message})
    }
    
    
}

const isValid = (regex, value) => {
    return regex.test(value)
}
const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn:"10m"})
}
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"15m"})
}
const creatRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn:"7d"})
}