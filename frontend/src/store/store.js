import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import productSlice from './productSlice'
import cartSlice from './cartSlice'
import singleProductSlice from './singleProductSlice'
import addressSlice from './addressSlice'
import orderSlice from './orderSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        product: productSlice,
        cart: cartSlice,
        singleProduct: singleProductSlice,
        address: addressSlice,
        order: orderSlice
    }
})

export default store