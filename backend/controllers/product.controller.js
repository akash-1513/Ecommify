const {asyncHandler} = require('../utils/asyncHandler');
const { Product } = require('../models/product.model');
const {uploadOnCloudinary} = require('../utils/fileUpload');
const { mongoose } = require('mongoose');


// ADMIN
const createProduct = asyncHandler(async(req, res) => {
    const {name, description, price, stocks, rating, category} = req.body;
    let images = [];
    for(let idx in req.files) {
        const image = await uploadOnCloudinary(req.files[idx].path)
        console.log(image.secure_url)
        images.push({public_id: image?.public_id, url: image?.secure_url})
    }

    if(!name || !description || !price || !stocks || images.length == 0 || !rating || !category) {
        return res.status(400).json({message: "Some fields are missing"})
    }

    const product = await Product.create({name, description, price, stocks, images, rating, category});

    if(!product) {
        return res.status(500).json({message: "Error while creating a product"})
    }

    return res.status(201).json({message: "Product created successfully", product})
})

const getProductDetails = asyncHandler(async(req, res) => {
    const {productId} = req.params;

    if(!productId) return res.status(400).json({message: "productId invalid"})
    // console.log(productId)
    // check whether it is a valid productId or not
    const product = await Product.findById(productId);

    if(!product) {
        return res.status(404).json({message: "Product with provided productId not found"})
    }


    const productDetails = await Product.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(productId)
            }
        },
        {
            $lookup: {
                from: "reviews",
                localField: "_id",
                foreignField: "productId",
                as: "reviews",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        fullName: 1,
                                        username: 1,
                                        avatar: 1
                                    }
                                }
                            ]
                        },
                    },
                    {
                        $addFields: {
                            owner: {
                                $first: "$owner"
                            }
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                totalReviews: {
                    $size: "$reviews"
                },
                rating: {
                    $avg: "$reviews.rating"
                }
            }
        },
    ])

    if(productDetails.length == 0) {
        return res.status(500).json({message: "Error in fetching product detail"})
    }

    return res.status(200).json({message: "Product detail fetched", productDetails: productDetails[0]})
})

const getAllProducts = asyncHandler(async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || ""
    const category = ((req.query.category === "All") ? "" : req.query.category) || "";


    let sort = req.query.sort || "rating";
    sort = sort.split(',')

    let sortBy = {};
    if(sort[1]) {
        sortBy[sort[0]] = (sort[1] === "asc") ? 1 : -1
    } else {
        sortBy[sort[0]] = -1
    }

    const productsCount = await Product.countDocuments()// create index for category field
    const categories = await Product.distinct("category")

    const products = await Product.aggregate([
        {
            $match: {
                name: {
                    $regex: search,
                    $options: "i"
                },
                category: {
                    $regex: category,
                    $options: "i"
                }
            }
        },
        {
            $sort: sortBy
        },
        {
            $skip: (page - 1) * limit 
        },
        {
            $limit: limit
        }
    ])

    res.status(200).json({message: "success", products, productsCount, categories})
})


module.exports = {createProduct, getProductDetails, getAllProducts}




// 66be809be1df292f1b458f19