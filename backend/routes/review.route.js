const {Router} = require('express')
const { verifyJWT } = require('../middlewares/auth.middleware')
const { createUpdateReview, deleteUserReview } = require('../controllers/review.controller')

const router = Router()

router.route("/:productId").post(verifyJWT, createUpdateReview)
router.route("/:reviewId").get(verifyJWT, deleteUserReview)

module.exports = router 