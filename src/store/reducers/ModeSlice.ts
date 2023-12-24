import { createSlice } from "@reduxjs/toolkit";

interface ModeState {
	state: boolean;
}

const initialState: ModeState = {
	state: true,
};

export const ModeSlice: any = createSlice({
	name: "mode",
	initialState,
	reducers: {
		setState(state, action) {
			state.state = action.payload;
		},
	},
});

export default ModeSlice.reducer;
