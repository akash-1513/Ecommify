import React, { useState, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from 'react-stars';
import { addReview } from '../store/singleProductSlice';
import { toast } from 'sonner';
import axios from 'axios';


function AddReview({productId}) {
    console.log("Add REview comp.")
    const {userData} = useSelector(state => state.auth)
    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState("")
    const dispatch = useDispatch()

    const server = "https://ecommify-aka9.onrender.com";

    const submitReview = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios.post(`${server}/api/v1/review/${productId}`, {rating, description}, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            
            dispatch(addReview({review: data.review, userData}))
            setDescription("")
            setRating(0)
            toast.success(data.message)
        } catch(error) {
            
            toast.error(error.response.data.message || error.message)
        }
    }

    return (
        <div class="bg-white p-6 rounded-lg shadow-lg w-full">
            <div class="mb-4">
                <label for="review-description" class="block text-sm font-medium text-gray-700 mb-2">Review Description</label>
                <textarea value = {description} onChange = {(e) => setDescription(e.target.value)} id="review-description" rows="4" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Write your review here..."></textarea>
            </div>

            <div class="mb-4">
                <label for="rating" class="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <ReactStars 
                    count={5} 
                    size={window.innerWidth < 600 ? 25 : 30} 
                    color1='gray' 
                    color2='black'
                    value={0} 
                    half={true}
                    onChange = {(newRating) => setRating(newRating)}
                />
            </div>
            <div className='flex justify-center items-center mt-2 md:block'>
                <button onClick = {submitReview} type="submit" class=" bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ">
                    Submit Review
                </button>
            </div>
        </div>
    )
}

export default memo(AddReview)