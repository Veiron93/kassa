import { createSlice } from "@reduxjs/toolkit";

interface ExampleState {
	example: Array<object> | null;
}

const initialState: ExampleState = {
	example: [],
};

export const ExampleSlice: any = createSlice({
	name: "example",
	initialState,
	reducers: {
		increment(state, action) {},
	},
});

export default ExampleSlice.reducer;
