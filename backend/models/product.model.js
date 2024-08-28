const {Schema, model} = require('mongoose')

const productSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        default: 0
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
    category: {
        type: String,
        required: true,
    },
    stocks: {
        type: Number,
        required: true,
        default: 1
    },

}, {timestamps: true})

const Product = model('Product', productSchema)

module.exports = {Product}