const {Review} = require('../models/review.model')
const {Product} = require('../models/product.model')
const {asyncHandler} = require('../utils/asyncHandler')

const createUpdateReview = asyncHandler(async(req, res) => {
    const {description, rating} = req.body;
    const {productId} = req.params;

    // validation

    if(!description || !rating) {
        return res.status(400).json({message: "Description or rating is missing"})
    }

    const product = await Product.findById(productId);

    if(!product) {
        return res.status(404).json({message: "Product not found"})
    }

    const review = await Review.findOne({owner: req.user?._id, productId});

    if(review) {
        review.description = description;
        review.rating = Number(rating)
        const newReview = await review.save({validateBeforeSave: true}, {new: true})
        return res.status(201).json({message: "Review updated successfully", review: newReview});
    } else {
        const newReview = await Review.create({rating: Number(rating), description, productId, owner: req.user?._id})
        if(!newReview) {
            return res.status(500).json({message: "Error while creating review"})
        }
        return res.status(201).json({message: "Review created successfully", review: newReview});
    }
})

const deleteUserReview = asyncHandler(async(req, res) => {
    const {reviewId} = req.params;
    const deletedReview = await Review.findByIdAndDelete(reviewId)
    if(!deletedReview) {
        return res.status(500).json({message: "Error while deleting review"})
    }
    return res.status(200).json({message: "Review deleted successfully"})
})

module.exports = {createUpdateReview, deleteUserReview}
