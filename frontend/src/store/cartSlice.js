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
        addToCart: (state, action) => {
            const item = action.payload.item
            const isItemExist = state.cartItems.find((i) => i.id === item.id)

            if(isItemExist) {
                state.cartItems = state.cartItems.map((i) => ((i.id === item.id) ? item : i))
            } else {
                console.log("pushed")
                state.cartItems.push(item)
                state.count += 1;
            }

            state.totalAmount = state.cartItems.reduce((accumulator, item) => accumulator + (item.price * item.quantity), 0)
        },
        deleteFromCart: (state, action) => {
            const id = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== id)
            state.count -= 1;
            state.totalAmount = state.cartItems.reduce((accumulator, item) => accumulator + (item.price * item.quantity), 0)
        },
        resetCart: (state) => {
            state.cartItems = [],
            state.count = 0,
            state.totalAmount = 0
        }
    }
})

export const {addToCart, deleteFromCart, resetCart} = cartSlice.actions
export default cartSlice.reducer