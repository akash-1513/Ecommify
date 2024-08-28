const {Router} = require('express')
const { registerUser, loginUser, logoutUser, getUserDetails, changeCurrentPassword, updateUserDetails} = require('../controllers/user.controller')
const {upload} = require('../middlewares/multer.middleware')
const {verifyJWT} = require('../middlewares/auth.middleware')

const router = Router()

router.route("/register").post(upload.single('avatar'), registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/profile").get(verifyJWT, getUserDetails)
router.route("/change-password").put(verifyJWT, changeCurrentPassword);
router.route("/update").put(verifyJWT, upload.single('avatar'), updateUserDetails)


module.exports = router