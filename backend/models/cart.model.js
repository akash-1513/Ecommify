const {Schema, model} = require('mongoose')

const cartSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cartItems: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ]
}, {timestamps: true})

const Cart = model('Cart', cartSchema);

module.exports = {Cart}