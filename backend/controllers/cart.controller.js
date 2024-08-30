const {Cart} = require('../models/cart.model')
const {User} = require('../models/user.model')

const addToCart = async (req, res) => {
    try {
        const {productId} = req.params;
        const userId = req.user?._id;
        const {quantity} = req.body;

        if(!productId) {
            return res.status(404).json({message: "Product not found with given productId"})
        }

        // fetch the cart corresponding to user
        let cart = await Cart.findOne({owner: userId})

        if(!cart) {
            cart = new Cart({owner: userId, cartItems: []})
        } 

        let productIndex = cart.cartItems.findIndex((item) => item.productId.toString() === productId)

        if(productIndex === -1) {
            cart.cartItems.push({productId, quantity})
        } else {
            cart.cartItems[productIndex].quantity = quantity;
        }

        const newCart = await cart.save({new: true})

        await newCart.populate({
            path: "cartItems.productId",
            select: "_id name price stocks images"
        })

        const cartItems = newCart.cartItems.map((item) => {
            return {
                _id: item.productId._id,
                name: item.productId.name,
                price: item.productId.price,
                images: item.productId.images,
                stocks: item.productId.stocks,
                quantity: item.quantity
            }
        })

        return res.status(200).json({message: "Item added to cart successfully", cartItems})
    } catch(error) {
        return res.status(500).json({error: error.message})
    }
}

const deleteFromCart = async (req, res) => {
    const {productId} = req.params;
    const userId = req.user?._id;

    if(!productId) {
        return res.status(404).json({message: "ProductId not found"})
    }

    const cart = await Cart.findOne({owner: userId})

    if(!cart) {
        return res.status(404).json({message: "Cart not found"})
    }

    const isProductExist = cart.cartItems.findIndex((item) => item.productId.toString() === productId)

    if(isProductExist === -1) {
        return res.status(404).json({message: "Product not found"})
    }

    cart.cartItems = cart.cartItems.filter((item) => item.productId.toString() != productId);

    const newCart = await cart.save({new: true});

    await newCart.populate({
        path: "cartItems.productId",
        select: "_id name price stocks images"
    })

    const cartItems = newCart.cartItems.map((item) => {
        return {
            _id: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            images: item.productId.images,
            stocks: item.productId.stocks,
            quantity: item.quantity
        }
    })

    return res.status(200).json({message: "item deleted from cart successfully", cartItems})
}

const getAllCartItems = async (req, res) => {
    try {
        const userId = req.user?._id;
        const user = await User.findById(userId)

        if(!user) return res.status(404).json({message: "user not found"})

        const cart = await Cart.findOne({owner: userId})

        if(!cart) {
            return res.status(200).json({message: "No item in the cart", cartItems: []})
        }

        await cart.populate({
            path: "cartItems.productId",
            select: "_id name price images stocks"
        })

        const cartItems = cart.cartItems.map((item) => {
            return {
                _id: item.productId._id,
                name: item.productId.name,
                price: item.productId.price,
                images: item.productId.images,
                stocks: item.productId.stocks,
                quantity: item.quantity
            }
        })

        return res.status(200).json({cartItems})
        
    } catch(error) {
        return res.status(500).json({message: "Server Issue"});
    }
}

module.exports = {addToCart, deleteFromCart, getAllCartItems}