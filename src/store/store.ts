import { combineReducers, configureStore } from "@reduxjs/toolkit";

// slices
import CodeProductReducer from "./reducers/CodeProductSlice";
import CartReducer from "./reducers/CartSlice";
import ProductDiscountReducer from "./reducers/ProductDiscountSlice";
import CartDiscountReducer from "./reducers/CartDiscountSlice";
import CatalogReducer from "./reducers/CatalogSlice";
import UsersReducer from "./reducers/UsersSlice";
import SaleFreePriceReducer from "./reducers/SaleFreePrice";

const rootReducer = combineReducers({
	CodeProductReducer,
	CartReducer,
	ProductDiscountReducer,
	CartDiscountReducer,
	UsersReducer,
	CatalogReducer,
	SaleFreePriceReducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
