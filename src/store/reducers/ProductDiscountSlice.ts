import { createSlice } from "@reduxjs/toolkit";

interface ProductDiscountState {
	state: boolean;
	product: object | null;
}

const initialState: ProductDiscountState = {
	state: false,
	product: null,
};

export const ProductDiscountSlice: any = createSlice({
	name: "productDiscount",
	initialState,
	reducers: {
		show(state, action) {
			state.product = action.payload;
			state.state = true;
		},

		hidden(state) {
			state.state = false;
		},
	},
});

export default ProductDiscountSlice.reducer;
