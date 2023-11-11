import { createSlice } from "@reduxjs/toolkit";

interface CartDiscountState {
	state: boolean;
}

const initialState: CartDiscountState = {
	state: false,
};

export const CartDiscountSlice: any = createSlice({
	name: "cartDiscount",
	initialState,
	reducers: {
		show(state) {
			state.state = true;
		},

		hidden(state) {
			state.state = false;
		},
	},
});

export default CartDiscountSlice.reducer;
