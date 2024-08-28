const {User} = require('../models/user.model')
const jwt = require('jsonwebtoken')
const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers["authorization"]?.split("Bearer ")[1];
        if(!token) {
            return res.status(401).json({message: "Please Login to access resource"});
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if(!user) {
            return res.status(401).json({message: "Invalid Access Token"})
        }

        req.user = user;
        next()
    } catch(error) {
        return res.status(401).json({message: "Please Login to access token", error: error.message});
    }
}

module.exports = {verifyJWT}