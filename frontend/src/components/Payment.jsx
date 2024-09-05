import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loading from './Loading'
import axios from 'axios'
import {toast} from 'sonner'
import { useNavigate } from 'react-router-dom'
import { addOrder } from '../store/orderSlice'

function Payment() {
    const {cartItems, totalAmount} = useSelector(state => state.cart)
    const [loading, setLoading] = useState(false)
    const {addressInfo: {state,address, city, phone, country}} = useSelector(state => state.address)
    const {status, userData} = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const server = "https://ecommify-aka9.onrender.com"

    const createOrder = async () => {
        try {
            const order = {cartItems, totalAmount, shippingInfo: {address, state, city, phone, country}}
            const {data: {createdOrder}} = await axios.post(`${server}/api/v1/order/create`, {order: JSON.stringify(order)}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            dispatch(addOrder({orderDetail: createdOrder}))
        } catch(error) {
            console.log(error)
        }
    }

    const handleCheckout = async (e) => {

        const details = {
            amount: totalAmount,
            currency: 'INR',
        }

        const {data: {order}} = await axios.post(`${server}/api/v1/payment/create-checkout-session`, {
            options: JSON.stringify(details)
        }, {
            headers: {
            'Content-Type': 'application/json'
        }})

        const options = {
            key: "",
            amount: totalAmount * 1000,
            currency: "INR",
            name: "Ecommify",
            description: "Test Transaction",
            order_id: order.id,
            image: "https://i.pinimg.com/originals/66/f7/72/66f77296282b5ab7c2780724802614c0.png",
            handler: async (res) => {
                const paymentInfo = {...res}

                const {data} = await axios.post(`${server}/api/v1/payment/validate`, {
                    paymentInfo: JSON.stringify(paymentInfo)
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                if(data?.status === "success") {
                    await createOrder()
                    console.log("Order created")
                    navigate("/orders")
                    toast.success('Payment successful')
                } else {
                    toast.error('Payment failed')
                }
            },
            prefill: {
                name: userData.fullName,
                email: userData.email,
            },
            theme: {
                address: "#3399cc"
            }
        }

        const rzp = new Razorpay(options)

        rzp.on("payment.failed", () => {
            alert("Payment failed")
        })

        rzp.open()
        e.preventDefault()
    }

  return (
    cartItems ? <div class="container mx-auto p-4">
        <div class="bg-white rounded-lg shadow-md p-6">
            <h1 class="text-2xl font-bold mb-6">Order Detail</h1>
            <div className='flex flex-col gap-5'>
                <div class="w-full space-y-4 border border-gray-300 rounded-sm">
                    {/* <!-- Product Item --> */}
                    {cartItems.map((item) => {
                        return (<div key = {item._id} class="flex justify-between flex-col p-4 bg-gray-50 rounded-lg shadow-sm md:flex-row">
                            <div class="flex items-center space-x-4">
                                <img src={item.images[0]?.url} alt="Product Image" class="w-20 h-20 object-cover rounded" />
                                <div>
                                    <h2 class="text-lg font-semibold">{item.name}</h2>
                                    <p class="text-gray-500">₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}</p>
                                </div>
                            </div>
                        <div class="flex items-center space-x-4 mt-4">
                            <div class="flex items-center border rounded-lg overflow-hidden p-2 bg-gray-800 text-white">
                                Qty: <input type="text" class="bg-gray-800 text-white w-12 text-center" value={item.quantity} readOnly />
                            </div>
                        </div>
                    </div>)
                    })}
                </div>
                <div className='w-full p-3 space-y-2 border border-gray-300 rounded-sm'>
                    <h2 className='font-semibold text-lg'>Address Details</h2>
                    <p>{`${address}, ${city}, ${state}`}</p>
                    <p>{`Phone: ${phone}`}</p>
                </div>
            </div>
            <hr className='mt-4' />
            <div className='flex mt-8 justify-center items-center flex-col gap-2'>
                <div className='flex items-center gap-2 justify-center'>
                    <h2 className='text-xl font-semibold'>Grand Total: </h2>
                    <h2 className='text-xl'>₹{totalAmount}</h2>
                </div>
                <div>
                <button onClick = {handleCheckout} className={`flex font-semibold justify-center items-center text-white rounded-md shadow-sm hover:opacity-90 ${loading ? 'opacity-90' : ''} bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle text-[15px] uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none `}>
                    {!loading ? "Place Order" : <img className = "w-11 px-2 text-center" src = "https://cdn.pixabay.com/animation/2023/05/02/04/29/04-29-06-428_512.gif"></img>}
                  </button>
                </div>
            </div>
        </div>
    </div> : <Loading />
  )
}

export default Payment