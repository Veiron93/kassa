import { combineReducers, configureStore } from "@reduxjs/toolkit";

// slices
import CodeProductReducer from "./reducers/CodeProductSlice";
import CartReducer from "./reducers/CartSlice";
import ProductDiscountReducer from "./reducers/ProductDiscountSlice";
import CartDiscountReducer from "./reducers/CartDiscountSlice";

import UsersReducer from "./reducers/UsersSlice";

const rootReducer = combineReducers({
	CodeProductReducer,
	CartReducer,
	ProductDiscountReducer,
	CartDiscountReducer,
	UsersReducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
