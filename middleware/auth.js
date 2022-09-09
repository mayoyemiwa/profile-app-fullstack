const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try{
        const token = req.body
        console.log("auth", token)
        if(!token) return res.status(400).json("Invalid Authentication.")

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(400).json("Please login")
            req.user = user
            console.log("auth", user)
            next()
        })
    }
    catch(err){
        return res.status(500).json({msg: err.message})
    }
}

module.exports = auth