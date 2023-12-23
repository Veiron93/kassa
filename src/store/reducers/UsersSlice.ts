import { createSlice } from "@reduxjs/toolkit";

interface UsersState {
	users: Array<object> | null;
	activeUserId: number | null;
}

const initialState: UsersState = {
	users: [],
	activeUserId: null,
};

export const UsersSlice: any = createSlice({
	name: "users",
	initialState,
	reducers: {
		setUsers(state, action) {
			state.users = action.payload;
		},
		setActiveUserId(state, action) {
			state.activeUserId = action.payload;
		},
	},
});

export default UsersSlice.reducer;
