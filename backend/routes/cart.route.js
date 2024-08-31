const {Router} = require('express')
const {verifyJWT} = require('../middlewares/auth.middleware')
const {addToCart, deleteFromCart, getAllCartItems} = require('../controllers/cart.controller')

const router = Router()

router.route("/add/:productId").post(verifyJWT, addToCart)
router.route("/delete/:productId").post(verifyJWT, deleteFromCart)
router.route("/").get(verifyJWT, getAllCartItems);

module.exports = router