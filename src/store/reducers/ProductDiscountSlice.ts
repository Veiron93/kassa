import { createSlice } from "@reduxjs/toolkit";

interface ProductDiscountState {
	state: boolean;
	product: object | null;
	test: string;
}

const initialState: ProductDiscountState = {
	state: false,
	product: null,
	test: "test",
};

export const ProductDiscountSlice: any = createSlice({
	name: "productDiscount",
	initialState,
	reducers: {
		show(state, action) {
			//console.log(action.payload);
			state.state = true;
			state.product = action.payload;
		},

		hidden(state) {
			state.state = false;
		},
	},
});

export default ProductDiscountSlice.reducer;
