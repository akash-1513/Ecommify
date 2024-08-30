const Razorpay = require('razorpay')
require('dotenv').config()
const crypto = require('crypto')

const handleRazorpayPayment = async (req, res) => {
    try {
        
        // created razorpay instance 

        // console.log(req.body)

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_ID,
            key_secret: process.env.RAZORPAY_SECRET
        })

        // options

        if(!req.body.options) {
            return res.status(400).json({message: "options not provided"})
        }

        const options = JSON.parse(req.body.options);

        const order = await razorpay.orders.create(options)

        // console.log("orderId: ", orderId)

        if(!order) return res.status(500).json({message: "Order not generated at server side"})

        return res.status(200).json({order})

    } catch(error) {
        console.log(error)
    }
}

const validatePayment = async (req, res) => {
    console.log("validatePayment")
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = JSON.parse(req.body.paymentInfo)

    const sha = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`)

    const digest = sha.digest("hex")

    if(digest !== razorpay_signature) {
        return res.status(400).json({status: "failed"})
    }

    return res.status(200).json({status: "success"})
}

module.exports = {handleRazorpayPayment, validatePayment}