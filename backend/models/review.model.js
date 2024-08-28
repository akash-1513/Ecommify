const {Schema, model} = require('mongoose')

const reviewSchema = new Schema({
    description: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    rating: {
        type: Number,
        required: true
    }
})

const Review = model('Review', reviewSchema)

module.exports = {Review}