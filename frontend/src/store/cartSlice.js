import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    count: 0,
    totalAmount: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItems: (state, action) => {
            state.cartItems = action.payload
            state.count = action.payload.length
            state.totalAmount = state.cartItems.reduce((accumulator, item) => accumulator + (item.price * item.quantity), 0)
        },
        resetCart: (state) => {
            state.cartItems = [],
            state.count = 0,
            state.totalAmount = 0
        }
    }
})

export const {addToCart, deleteFromCart, resetCart, setCartItems} = cartSlice.actions
export default cartSlice.reducer