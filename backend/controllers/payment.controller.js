const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const createPayment = async (req, res) => {
    const {products} = req.body;

    const lineItems = products.map((product) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: product.name,
                images: [product.image],
            },
            unit_amount: Math.round(product.price * 100)
        },
        quantity: product.quantity
    }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/cart"
    })

    return res.status(200).json({id: session.id})
}

module.exports = {createPayment}