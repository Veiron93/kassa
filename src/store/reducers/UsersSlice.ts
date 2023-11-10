import { createSlice } from "@reduxjs/toolkit";

interface UsersState {
	users: Array<object> | null;
	userId: number | null;
	userToken: number | null;
}

const initialState: UsersState = {
	users: [],
	userId: null,
	userToken: null,
};

export const UsersSlice: any = createSlice({
	name: "users",
	initialState,
	reducers: {
		setUser(state, action) {
			state.userId = action.payload.id;
			state.userToken = action.payload.token;
		},
	},
});

export default UsersSlice.reducer;
