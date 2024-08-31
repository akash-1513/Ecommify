const express = require('express')
const cookieParser = require('cookie-parser');
const productRouter = require('./routes/product.route')
const userRouter = require('./routes/user.route')
const reviewRouter = require('./routes/review.route')
const paymentRouter = require('./routes/payment.route')
const cartRouter = require('./routes/cart.route')
const orderRouter = require('./routes/order.route')
const path = require('path')
// const cors = require('cors')

const app = express();

// app.use(cors({
//     origin: "https://ecommify-frontend.onrender.com", // or an array of allowed origins
//     methods: "GET,POST,PATCH,DELETE",
//     credentials: true
// }));

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))


// routes
app.use('/api/v1/product', productRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/review', reviewRouter)
app.use('/api/v1/payment', paymentRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/order', orderRouter)


module.exports = {app}