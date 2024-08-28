import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productInfo: null,
    reviews: [],
    avgRating: 0
}

export const singleProductSlice = createSlice({
    name: 'singleProduct',
    initialState,
    reducers: {
        setSingleProductData: (state, action) => {
            state.productInfo = action.payload.productInfo
            state.reviews = action.payload.reviews
            state.avgRating = action.payload.productInfo.rating
        },
        addReview: (state, action) => {
            const review = action.payload.review;
            const userData = action.payload.userData

            const newReview = {...review, owner: userData};

            const isReviewAlreadyPresent = state.reviews.find((r) => r._id === newReview._id)
            if(isReviewAlreadyPresent) {
                state.reviews = state.reviews.map((r) => (r._id === newReview._id) ? newReview : r);
            } else {
                state.reviews.push(newReview)
            }

            const totalRating = state.reviews.reduce((accumulator, curr) => accumulator + curr.rating, 0)
            const totalReviews = state.reviews.length 
            state.avgRating = (totalRating / totalReviews)
        }
    }
})

export const {setSingleProductData, addReview} = singleProductSlice.actions;
export default singleProductSlice.reducer;
