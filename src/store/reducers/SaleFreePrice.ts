import { createSlice } from "@reduxjs/toolkit";

interface SaleFreePriceState {
	state: boolean;
}

const initialState: SaleFreePriceState = {
	state: false,
};

export const SaleFreePriceSlice: any = createSlice({
	name: "SaleFreePrice",
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

export default SaleFreePriceSlice.reducer;
