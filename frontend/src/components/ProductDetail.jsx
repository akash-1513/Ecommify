import axios from 'axios';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import ReactStars from 'react-stars';
import {useDispatch, useSelector} from 'react-redux'
import Loading from './Loading';
import { setCartItems } from '../store/cartSlice';
import {toast} from 'sonner'
import AddReview from './AddReview';
import { setSingleProductData } from '../store/singleProductSlice';
import { useQuery } from '@tanstack/react-query';


function ProductDetail() {
    const [quantity, setQuantity] = useState(1);
    const {productId} = useParams()
    const dispatch = useDispatch()
    const {productInfo, reviews, avgRating} = useSelector(state => state.singleProduct)
    const server = "https://ecommify-aka9.onrender.com"

    const getProductDetails = async () => {
        try {
            // setLoading(true)
            const {data} = await axios.get(`${server}/api/v1/product/${productId}`)
            const productInfo = {
                _id: data?.productDetails._id,
                name: data?.productDetails.name,
                price: data?.productDetails.price,
                stocks: data?.productDetails.stocks,
                description: data?.productDetails.description,
                rating: data?.productDetails.rating,
                images: data?.productDetails.images,
                category: data?.productDetails.category
            }

            const reviews = data?.productDetails.reviews

            dispatch(setSingleProductData({productInfo, reviews}))
            return data
            // setLoading(false)
        } catch(error) {
            toast.error(error.response.data.message || error.message)
            throw error 
        }
    }

    const handleAddToCart = async () => {
        try {

            const {data} = await axios.post(`${server}/api/v1/cart/add/${productId}`, {
                quantity
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })

            dispatch(setCartItems(data?.cartItems))

            toast.success("Item Added To Cart")
        } catch(error) {
            console.log(error)
            toast.error(error.response.data.message || error.message)
        }
        
    }

    const {isLoading} = useQuery({
        queryKey: ["singleProductData", productId],
        queryFn: getProductDetails
    })

  return !isLoading ? (<section className='w-11/12 my-16 m-auto flex flex-col justify-center items-center md:w-4/5'>
        <div className = "w-full flex flex-col items-center md:flex-row md:justify-between md:space-x-10">
            <div className = "">
                <img src={productInfo?.images[0]?.url} alt="" />
            </div>
            <div className='space-y-4 p-5'>
                <h1 className='text-2xl font-bold md:text-3xl'>{productInfo?.name}</h1>
                <div className='flex gap-2 items-center'>
                    <h3 className={`text-md text-white px-1 ${avgRating >= 3 ? 'bg-green-500' : 'bg-red-500'} rounded-sm`}>{avgRating ? avgRating.toFixed(1) : 0} ★</h3>
                    <ReactStars 
                        count={5} 
                        size={window.innerWidth < 600 ? 18 : 22} 
                        color1='gray' 
                        color2='black'
                        value={avgRating} 
                        half={true} 
                        edit={false} 
                    />
                </div>
                <h2 className='text-lg font-bold md:text-xl'>₹ {productInfo?.price}</h2>
                <p className='text-sm'>{productInfo?.description}</p>
                <div class="flex items-center rounded-lg overflow-hidden">
                    <button className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => setQuantity(prev => prev > 0 ? prev - 1 : prev)}>-</button>
                    <input type="text" class="w-12 text-center border-t border-b border-gray-300" value={quantity} onChange={(e) => setQuantity(e.target.value)} readonly />
                    <button className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => setQuantity(prev => prev < productInfo?.stocks ? prev + 1 : prev)}>+</button>
                </div>
                <button onClick = {handleAddToCart} className='bg-red-600 px-5 py-2 rounded-md text-white hover:bg-white hover:border hover:border-gray-600 hover:text-black'>
                    <i class = "fa-solid fa-cart-shopping text-xl px-1" />
                    <span>Add To Cart</span>
                </button>
            </div>
        </div>

        <AddReview productId={productId}/>
        
        <div className='mt-20 text-center'>
            <h1 className='text-2xl font-semibold'>Reviews</h1>
            <div className='flex flex-wrap gap-10 mt-10 justify-around scroll-m-2 w-full'>
                {
                    reviews?.length > 0 ? (reviews?.map((review) => {
                        return <ReviewCard key = {review?._id} fullName = {review?.owner?.fullName} avatar = {review?.owner?.avatar.url} rating = {review?.rating} description = {review?.description}/>
                    })) : <h1 className='text-gray-700'>No reviews available</h1>
                }    
            </div>
        </div>
    </section>) : <Loading />
}
export default ProductDetail