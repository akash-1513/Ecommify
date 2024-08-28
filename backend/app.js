const express = require('express')
const cookieParser = require('cookie-parser');
const productRouter = require('./routes/product.route')
const userRouter = require('./routes/user.route')
const reviewRouter = require('./routes/review.route')
const paymentRouter = require('./routes/payment.route')
// const cors = require('cors')

const app = express();

// app.use(cors({
//     origin: "http://localhost:5173",
//     methods:"GET,POST,PATCH,DELETE",
//     credentials: true
// }))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))


// routes
app.use('/api/v1/product', productRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/review', reviewRouter)
app.use('/api/v1/payment', paymentRouter)

module.exports = {app}