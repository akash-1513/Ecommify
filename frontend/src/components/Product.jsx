import React, {memo} from 'react'
import ReactStars from 'react-stars'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart, setCartItems } from '../store/cartSlice'
import { toast } from 'sonner'
import axios from 'axios'

function Product({product}) {
  const dispatch = useDispatch()
  const server = "https://ecommify-backend.onrender.com"

  const handleAddToCart = async () => {
    try {
      const {data} = await axios.post(`/api/v1/cart/add/${product?._id}`, {quantity: 1}, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      dispatch(setCartItems(data.cartItems))
      toast.success("Item added to cart")
    } catch(error) {
      toast.error(error.response.data.message || error.message)
    }
  }
  
  return (
    <div className="w-60 rounded-md shadow-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:-translate-y-2 bg-white max-w-sm mx-auto">
        <Link to = {`/products/${product._id}`}>
          <div className="relative p-4">
              <img className="w-full h-44 object-cover object-center rounded-sm" src={product.images[0]?.url} alt={product.name} />
          </div>
        </Link>
        <div className="p-3">
          <h2 className="text-md text-gray-800">{product.name}</h2>
          <ReactStars 
          count={5} 
          size={window.innerWidth < 600 ? 18 : 22} 
          color1='gray' 
          color2='black'
          value={product.rating} 
          half={true} 
          edit={false} 
          />
          <div className='flex items-center justify-between'>
            <p className="text-md font-semibold mt-1">₹ {product.price}</p>
            <i onClick = {handleAddToCart} className="fa-solid fa-bag-shopping text-xl hover:cursor-pointer text-green-600 md:text-2xl"></i>
          </div>
        </div>
    </div>
  )
}

export default memo(Product)