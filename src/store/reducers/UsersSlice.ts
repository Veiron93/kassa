import { createSlice } from "@reduxjs/toolkit";

interface UsersState {
	users: Array<object> | null;
	user: object | null;
	// userId: number | null;
	// userToken: number | null;
}

const initialState: UsersState = {
	users: [],
	user: null,
	//userId: null,
	//userToken: null,
};

export const UsersSlice: any = createSlice({
	name: "users",
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload;
			// state.userId = action.payload.id;
			// state.userToken = action.payload.token;
		},
	},
});

export default UsersSlice.reducer;
