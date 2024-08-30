const {Router} = require('express')
const { handleRazorpayPayment, validatePayment} = require('../controllers/payment.controller')

const router = Router()

router.route("/create-checkout-session").post(handleRazorpayPayment)
router.route('/validate').post(validatePayment)

module.exports = router