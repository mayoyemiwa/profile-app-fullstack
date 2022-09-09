
require('dotenv').config()
const bcrypt = require('bcrypt');
const Users = require('../models/User');
// const UserVerification = require('../model/userVerification');
const nodemailer = require('nodemailer');
const {google} = require('googleapis')
const {OAuth2} = google.auth;

const  {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS,
    CURRENT_URL,
    OAUTH_PLAYGROUND
} = process.env

const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS,
    OAUTH_PLAYGROUND 
)


module.exports.sendMail = async(email, url , txt)=>{
    oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN
    })
    const accessToken = oauth2Client.getAccessToken()
    const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: { 
            type: "OAuth2",
            user: SENDER_EMAIL_ADDRESS,
            clientId :MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken 
        }
    })

    const mailOptions = {
        from:SENDER_EMAIL_ADDRESS,
        to:email,
        subject:"Please verify your account",
        html:`<p>Veify your email to complete your signup and login into your account.</><p>This link 
        <b>expires in 5 minutes </b>.</p><p>press <a href=${url}>here</a> to proceed</p>
        
        <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        <div>${url}  ${txt}</div>`,
    }
    
    smtpTransport.sendMail(mailOptions, (err, infor) => {
        if(err) return err;
        return infor
    })
}


module.exports.sendForgetPwdEmail = async({email}, res)=>{
    const currentUrl = CURRENT_URL;
    // const currentUrl = "http://localhost:5000"
    const mailOptions = {
        from:SENDER_EMAIL_ADDRESS,
        to:email,
        subject:"Change your password",
        html:`<p>Please click the link below to authenticate that this is you trying to change your password.</><p>This link 
        </p><p><b>press.</b><a href=${
            currentUrl + '/api/user/pwdAuth/' + email}>here</a> to proceed</p>`,
    }
            try{
                await smtpTransport.sendMail(mailOptions);
                res.json({
                    status:"PENDING",
                    message:"Verification message sent successfully, check your email to change your password"
                })
            }
            catch(err){
                res.json({
                    status:"FAILED",
                    message:"Verification message sent: Not successfull, please reload to try again"
                })
            }
}


module.exports.handleErrors = (err) => {
    let errors = {email:""}
    // console.log(err.message)
    // if(err.message === "invalid email"){
    //     errors.email = "Please enter a valid email";
    //     console.log("meee")
    //     return errors
    // }
    if(err.message.includes("User validation failed")){
        Object.values(err.errors).forEach((properties) => {
            errors[properties.path] = properties.message
        });
        return errors
    }
    if(err.code === 11000){
        errors.email = 'Email already exist';
        return errors;
    }
}