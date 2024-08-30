import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: []
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrder: (state, action) => {
            const {orderDetail} = action.payload;
            state.orders.push(orderDetail)
        },
        setUserOrders: (state, action) => {
            state.orders = action.payload.orders
        }
    }
})

export const {addOrder, setUserOrders} = orderSlice.actions
export default orderSlice.reducer