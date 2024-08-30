import { useDispatch, useSelector } from 'react-redux'
import Product from './Product'
import { useState } from 'react'
import axios from 'axios'
import { setProductData } from '../store/productSlice'
import Loading from './Loading'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'
import Dropdown from './Dropdown'
import Search from './Search'
import useDebounce from '../hooks/useDebounce'

function ProductPage() {
    const {products, productsCount} = useSelector(state => state.product)
    const [search, setSearch] = useState("")
    const debounceValue = useDebounce(search)
    const dispatch = useDispatch()
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [sortBy, setSortBy] = useState("Popularity")
    const [category, setCategory] = useState("All")
    const [categoryList, setCategoryList] = useState([])
    const server = "https://ecommify-backend.onrender.com"

    const fetchData = async () => {
        try {
            let sortByQuery = "";
            if(sortBy == "Price: Low to High") {
                sortByQuery = "price,asc"
            } else if(sortBy === "Price: High to Low") {
                sortByQuery = "price,desc"
            } else {
                sortByQuery = "rating"
            }
            const {data} = await axios.get(`${server}/api/v1/product/?search=${debounceValue}&page=${page}&limit=${limit}&category=${category}&sort=${sortByQuery}`)
            dispatch(setProductData({products: data.products, productsCount: data.productsCount}))
            setCategoryList(data.categories)
            console.log(data)
            return data
        } catch(error) {
            toast.error(error.response.data.message || error.message)
            throw error 
        }
    }

    const {isLoading} = useQuery({
        queryKey: ["productPageData", page, limit, debounceValue, sortBy, category, categoryList],
        queryFn: fetchData,
    })

    return (
      <div className='flex flex-col justify-center items-center px-6 pb-16'>
        <div className='w-full mt-10 flex flex-col gap-5'>
            <Search text = {search} setText = {setSearch}/>
            <div className='flex justify-end items-center gap-4'>
                <Dropdown optionValue = {sortBy} setOptionValue = {setSortBy} selectName = "Sort By" items = {["Popularity", "Price: Low to High", "Price: High to Low"]}/>
                <Dropdown optionValue = {category} setOptionValue = {setCategory} selectName='Category' items={["All", ...categoryList]}/>
            </div>
        </div>
        {!isLoading ? <div className='mt-10'>
                <div className='flex justify-center flex-wrap gap-5'>
                    {
                        products?.map((product) => {
                            return <Product key = {product._id} product = {product} />
                        })
                    }
                </div>
            </div> : <Loading />} 
        <hr />
        <div className='flex justify-center items-center gap-8 mt-16'>
            <button className = "px-4 py-2 bg-gray-800 text-white rounded-md hover:opacity-90 cursor-pointer" onClick = {() => setPage(prev => (prev > 1) ? prev - 1 : prev)} disabled = {page === 1} > {"<"} </button>
            <p className='font-semibold bg-black text-white text-center py-2 px-4 rounded-md shadow-sm'>{page}</p>
            <button className = "px-4 py-2 bg-gray-800 text-white rounded-md hover:opacity-90 cursor-pointer" onClick={() => setPage((prev) => prev + 1)} disabled = {page === Math.ceil(productsCount / limit)}>{">"}</button>
        </div>
    </div>

)}

export default ProductPage