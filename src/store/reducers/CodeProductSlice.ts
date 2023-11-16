import { createSlice } from "@reduxjs/toolkit";

interface CodeProductState {
	code: string;
	state: boolean;
}

const initialState: CodeProductState = {
	code: "",
	state: false,
};

export const CodeProductSlice: any = createSlice({
	name: "codeProduct",
	initialState,
	reducers: {
		state(state, action) {
			state.state = action.payload;
		},

		increment(state, action) {
			if (state.code == null) {
				state.code = action.payload;
			} else {
				state.code += action.payload;
			}
		},

		complete(state, action) {},

		delSymbol(state) {
			if (state.code.length) {
				state.code = state.code.substring(0, state.code.length - 1);
			}
		},

		clearCode(state) {
			state.code = "";
		},
	},
});

export default CodeProductSlice.reducer;
