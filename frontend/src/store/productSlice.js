import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    featuredProducts: [],
    productsCount: 0,
    searchQuery: ""
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProductData: (state, action) => {
            state.products = action.payload.products
            state.productsCount = action.payload.productsCount
        },
        setFeaturedProductData: (state, action) => {
            state.featuredProducts = action.payload.products 
        },
        setSearchProductQuery: (state, action) => {
            state.searchQuery = action.payload
        }
    }
})

export const {setProductData, setSearchProductQuery, setFeaturedProductData} = productSlice.actions
export default productSlice.reducer