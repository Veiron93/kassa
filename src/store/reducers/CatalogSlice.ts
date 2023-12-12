import { createSlice } from "@reduxjs/toolkit";

// models
import { Product, Category, Favorite } from "@/models/catalog";

interface CatalogState {
	products: Array<Product> | [];
	categories: Array<Category> | [];
	favorites: Array<Favorite> | [];
}

const initialState: CatalogState = {
	products: [],
	categories: [],
	favorites: [],
};

export const CatalogSlice: any = createSlice({
	name: "catalog",
	initialState,
	reducers: {
		setProducts(state, action) {
			state.products = [...action.payload];
		},

		setCategories(state, action) {
			state.categories = [...action.payload];
		},

		setFavorites(state, action) {
			state.favorites = [...action.payload];
		},
	},
});

export default CatalogSlice.reducer;
