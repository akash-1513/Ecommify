import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, deleteFromCart, resetCart, setCartItems } from '../store/cartSlice'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import Button from './Button'
import {useQuery} from '@tanstack/react-query'
import Loading from '../components/Loading'

function ShopingCart() {
    const {cartItems, totalAmount, count} = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const {status} = useSelector(state => state.auth)
    const navigate = useNavigate()
    const server = "https://ecommify-backend.onrender.com"

    useEffect(() => {
        if(!status) {
            toast.warning("Login Required")
            navigate("/login") 
        }
    }, [])

    const handleRemoveItem = async (id) => {
        try {
            const {data} = await axios.post(`${server}/api/v1/cart/delete/${id}`)
            dispatch(setCartItems(data.cartItems))
        } catch(error) {
            toast.error(error.response.data.error || error.message)
            console.log(error)
        }
    }

    const handleQuantityChange = async (id, quantity) => {
        try {
            const {data} = await axios.post(`${server}/api/v1/cart/add/${id}`, {quantity}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            dispatch(setCartItems(data.cartItems))
        } catch(error) {
            toast.error(error.response.data.message || error.message)
            throw error
        }
    }
    
    return count > 0 ? (
    <div class="container mx-auto p-4">
        <div class="bg-white rounded-lg shadow-md p-6">
            <h1 class="text-2xl font-bold mb-6">Shopping Cart</h1>
            <div class="space-y-4">
                {/* <!-- Product Item --> */}
                {cartItems.map((item) => {
                    return (<div key = {item._id} class="flex justify-between flex-col p-4 bg-gray-50 rounded-lg shadow-sm md:flex-row">
                    <Link to = {`/products/${item._id}`}>
                        <div class="flex items-center space-x-4">
                            <img src={item.images[0]?.url} alt="Product Image" class="w-20 h-20 object-cover rounded" />
                            <div>
                                <h2 class="text-lg font-semibold">{item.name}</h2>
                                <p class="text-gray-500">₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}</p>
                            </div>
                        </div>
                    </Link>
                    <div class="flex items-center space-x-4 mt-4">
                        <div class="flex items-center border rounded-lg overflow-hidden">
                            <button class="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => handleQuantityChange(item._id, (item.quantity > 1) ? item.quantity - 1 : item.quantity)}>-</button>
                            <input type="text" class="w-12 text-center border-t border-b border-gray-300" value={item.quantity} readOnly />
                            <button class="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => handleQuantityChange(item._id, (item.quantity < item.stocks) ? item.quantity + 1 : item.quantity)}>+</button>
                        </div>
                        <button class="px-4 py-2 bg-red-700 text-white hover:opacity-90" onClick = {() => handleRemoveItem(item._id)}>Remove</button>
                    </div>
                </div>)
                })}
            </div>
            <hr className='mt-4' />
            <div className='flex mt-8 justify-center items-center flex-col gap-2'>
                <div className='flex items-center gap-2 justify-center'>
                    <h2 className='text-xl font-semibold'>Grand Total: </h2>
                    <h2 className='text-xl'>₹{totalAmount}</h2>
                </div>
                <div>
                <button onClick = {() => navigate("/address")} className={`flex font-semibold justify-center items-center text-white rounded-md shadow-sm hover:opacity-90 ${loading ? 'opacity-90' : ''} bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle text-[15px] uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none `}>
                    Place Order
                  </button>
                </div>
            </div>
        </div>
    </div>
  ) : <div className='h-screen flex flex-col justify-center items-center gap-3'>
        <h2 className='text-xl text-gray-800'>No Item in the cart</h2>
        <Link to = "/products">
            <Button name = "Shop now"/>
        </Link>
    </div>
}

export default ShopingCart