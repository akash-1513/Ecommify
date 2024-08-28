const {Router} = require('express')
const { createPayment } = require('../controllers/payment.controller')

const router = Router()

router.route("/create-checkout-session").post(createPayment)

module.exports = router