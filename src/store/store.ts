import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CodeProductReducer from "./reducers/CodeProductSlice";

const rootReducer = combineReducers({
	CodeProductReducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
