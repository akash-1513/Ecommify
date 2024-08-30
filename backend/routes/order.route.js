const {Router} = require('express')
const {verifyJWT} = require('../middlewares/auth.middleware')
const { createOrder, getAllUserOrders } = require('../controllers/order.controller')

const router = Router()

router.route("/create").post(verifyJWT, createOrder)
router.route("/").get(verifyJWT, getAllUserOrders)

module.exports = router 