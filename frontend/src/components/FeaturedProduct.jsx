import React from 'react'
import Product from './Product'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Loading from './Loading'

function FeaturedProduct() {

    const server = "https://ecommify-backend.onrender.com";

    const fetchData = async () => {
        try {
            const {data} = await axios.get(`/api/v1/product/?page=1&limit=5`)
            return data?.products
        } catch(error) {
            throw error
        }
    }

    const {data, isLoading, error, isError} = useQuery({
        queryKey: ["featuredProductData"],
        queryFn: fetchData
    })

    if(isError) return <h1>Error....</h1>

    return !isLoading ? (
        <div className = "px-6 pb-28">
            <h1 className='drop-shadow-sm text-2xl text-center font-semibold md:text-4xl'>Featured Products</h1>
            <div className='flex flex-wrap justify-center items-center gap-6 mt-10 '>
                {data?.map((product) => {
                    return <Product key = {product._id} product = {product} />
                })}
            </div>
        </div>
    ) : <Loading />
}

export default FeaturedProduct