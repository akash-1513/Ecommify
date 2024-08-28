import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import productSlice from './productSlice'
import cartSlice from './cartSlice'
import singleProductSlice from './singleProductSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        product: productSlice,
        cart: cartSlice,
        singleProduct: singleProductSlice
    }
})

export default store