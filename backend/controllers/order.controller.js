const {Order} = require('../models/order.model')

// TODO: 

const createOrder = async (req, res) => {
    const order = JSON.parse(req.body.order);
    const userId = req.user?._id;

    if(!userId) return res.status(404).json({message: "User not found"})

    if(!order) {
        return res.status(400).json({message: "Order detail not found"})
    }

    const createdOrder = await Order.create({...order, owner: userId})

    if(!createdOrder) {
        return res.status(500).json({message: "Order not created due to server issue"})
    }

    return res.status(200).json({message: "Order created successfully", createdOrder})
}

const getAllUserOrders = async (req, res) => {
    const userId = req.user?._id;
    if(!userId) return res.status(404).json({message: "User not found"})
    
    const orders = await Order.find({owner: userId})

    if(!orders) return res.status(500).json({message: "Order not created due to server issue"})

    return res.status(200).json({orders})
}

module.exports = {createOrder, getAllUserOrders}