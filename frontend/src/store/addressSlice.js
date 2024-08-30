import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    addressInfo: {}
}

const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {
        setAddressInfo: (state, action) => {
            state.addressInfo = action.payload.shippingInfo
        }
    }
})

export const {setAddressInfo} = addressSlice.actions
export default addressSlice.reducer