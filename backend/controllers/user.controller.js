const {User} = require('../models/user.model')
const {asyncHandler} = require('../utils/asyncHandler')
const jwt = require('jsonwebtoken')
const { deleteFromCloudinary, uploadOnCloudinary } = require('../utils/fileUpload')

const generateAccessRefreshToken = asyncHandler(async(userId) => {
    const user = await User.findById(userId);
    if(!user) return res.status(404).json({message: "User not found"})
    
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken;

    await user.save({validateBeforeSave: false})

    return {accessToken, refreshToken}
})

const registerUser = asyncHandler(async(req, res) => {
    const {fullName, username, email, password} = req.body;
    if(!fullName || !username || !email || !password) {
        return res.status(404).json({message: "Some fields are missing"})
    }
    
    const avatarLocalFilePath = req.file?.path;
    let avatar;
    if(avatarLocalFilePath) {
        avatar = await uploadOnCloudinary(avatarLocalFilePath)
        if(!avatar) {
            return res.status(500).json({message: "Error occured while uploading on cloudinary"})
        }
    }

    let user;
    if(avatar) {
        user = await User.create({username, email, fullName, password, 
            avatar: {
                url: avatar.secure_url,
                public_id: avatar.public_id
            }
        })
    } else {
        user = await User.create({username, email, fullName, password})
    }

    if(!user) {
        return res.status(500).json({message: "Error occured in creating user"})
    }

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    return res.status(201).json({message: "User created successfully", createdUser})
})

const loginUser = asyncHandler(async(req, res) => {
    const {username, password} = req.body

    if(!username || !password) {
        return res.status(400).json({message: "Username or password is missing"})
    }

    const user = await User.findOne({username})

    if(!user) {
        return res.status(404).json({message: "User not found"})
    }

    const isPasswordMatched = await user.isPasswordCorrect(password);

    if(!isPasswordMatched) {
        return res.status(400).json({message: "Password is wrong"})
    }

    const {accessToken, refreshToken} = await generateAccessRefreshToken(user._id);

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        domain: "ecommify-aka9.onrender.com"
    }

    res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json({message: "User logged in successfully", user, refreshToken, accessToken})
})

const logoutUser = asyncHandler(async(req, res) => {
    const user = await User.findByIdAndUpdate(req.user?._id, {
        $unset: {
            refreshToken: 1
        }
    }, {new: true})

    const options = {
        httpOnly: true,
        secure:  true,
        sameSite: 'none',
        domain: "ecommify-aka9.onrender.com"
    }
    
    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json({message: "User logged out successfully"});
})

const getUserDetails = asyncHandler(async(req, res) => {
    const userId = req.user?._id;
    const user = await User.findById(userId).select("-password -refreshToken")

    if(!user) {
        return res.status(401).json({message: "User not logged in"})
    }

    return res.status(200).json({user})
})

const changeCurrentPassword  = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword} = req.body;
    if(!oldPassword || !newPassword) {
        return res.status(400).json({message: "Old password or new password is missing"})
    }
    const user = await User.findById(req.user?._id)
    if(!user) {
        return res.status(401).json({message: "Unauthorized acess"})
    }
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    if(!isPasswordCorrect) {
        return res.status(400).json({message: "Old password is incorrect"})
    }
    user.password = newPassword;
    await user.save({validateBeforeSave: false})

    return res.status(200).json({message: "Password changed successfully"})
})

const updateUserDetails = asyncHandler(async(req, res) => {
    const {username, fullName, email} = req.body;
    console.log(username, fullName, email)
    if(!username || !fullName || !email) return res.status(400).json({message: "Some feilds are missing"});
    const userId = req.user?._id;
    console.log(userId)
    const user = await User.findById(userId);
    if(!user) return res.status(404).json({message: "User not found"})

    const avatarFilePath = req.file?.path;
    if(avatarFilePath) {

        const publicId = user.avatar?.public_id;

        // const result = await deleteFromCloudinary(publicId)

        // if(!result) {
        //     return res.status(500).json({message: "Error while performing deletion on cloudinary"})
        // }

        const response = await uploadOnCloudinary(avatarFilePath)

        if(!response) {
            return res.status(500).json({message: "Error while performing upload on cloudinary"})
        }

        user.avatar = {
            url: response.secure_url,
            public_id: response.public_id
        }
    } 

    user.username = username;
    user.email = email
    user.fullName = fullName

    const updatedUser = await user.save({validateBeforeSave: false}, {new: true})


    return res.status(200).json({message: "User updated successfully", user: updatedUser})
})

module.exports = {registerUser, loginUser, logoutUser, getUserDetails, changeCurrentPassword, updateUserDetails}