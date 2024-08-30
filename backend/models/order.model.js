const {Schema, model} = require('mongoose')

const orderSchema = new Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true,
        }
    },
    cartItems: [
        {   
            _id: {
                type: Schema.Types.ObjectId,
                ref: "Product"
            },
            name: {
                type: String,
                required: true
            },
            images: [
                {
                    public_id: {
                        type: String,
                        required: true
                    },
                    url: {
                        type: String, // cloudinary
                        required: true,
                    }
                }
            ],
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            stocks: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    orderStatus: {
        type: String,
        default: "Processing"
    },
    paymentStatus: {
        type: String,
        default: "Paid" 
    },
    deliveredAt: Date
    // payment System on hold
}, {timestamps: true})

const Order = model('Order', orderSchema)

module.exports = {Order}