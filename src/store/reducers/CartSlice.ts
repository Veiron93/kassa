import { createSlice } from "@reduxjs/toolkit";

import { Discount, Product } from "@/modules/products";

interface CartState {
	products: Array<Product> | null;
	stateAddProducts: boolean;
	productsDiscount: Array<{
		productCode: number;
		sumDiscount: number;
	}>;
	totalDiscount: number;
}

const initialState: CartState = {
	products: [
		{
			code: 6953156207295,
			name: "Адаптер питания Baseus 30w (чёрный)",
			price: 700,
			leftover: 10,
			quanty: 2,
		},
		{
			code: 6932172606909,
			name: "Адаптер питания Baseus 10.5w (чёрный)",
			price: 1200,
			leftover: 12,
			quanty: 3,
		},
	],

	stateAddProducts: true,

	productsDiscount: [],
	totalDiscount: 0,
};

export const CartSlice: any = createSlice({
	name: "Cart",
	initialState,
	reducers: {
		// добавить товар
		add(state, action) {
			state.products?.push(action.payload);
		},

		// удалить товар
		del(state, action) {
			const index: number | undefined = state.products?.findIndex((product: Product) => product.code === action.payload);

			if (index !== undefined) {
				state.products?.splice(index, 1);
			}
		},

		// изменить количество
		changeQuanty(state, action) {
			const codeProduct = action.payload.code;
			const quanty = action.payload.quanty;
			const type = action.payload.type;

			const product: Product | undefined = state.products?.find((product: Product) => product.code === codeProduct);

			if (product && state.products?.length && state.products.length > 0) {
				if (type && type === "manual") {
					product.quanty = quanty;
				} else {
					if ((quanty === -1 && product.quanty != 1) || quanty === 1) {
						product.quanty += quanty;
					}
				}
			}
		},

		// очистить список
		clearList(state) {
			state.products = [];
		},

		onStateAddProducts(state, action) {
			state.stateAddProducts = action.payload;
		},

		addDiscountProduct(state, action) {
			const productCode = action.payload.code;
			const discount = action.payload.discount;

			if (state.products) {
				let product = state.products.find((p) => p.code === productCode);

				if (product) {
					product.discount = {
						value: discount.value,
						typeValue: discount.typeValue,
						range: discount.range,
					};
				}
			}
		},

		addDiscountAllProducts(state, action) {
			const discount = action.payload.discount;

			if (state.products) {
				let productDiscount: Discount = {
					...discount,
				};

				let discountValue = 0;
				let sumPrice = state.products.reduce((sum: number, current: Product) => sum + current.price * current.quanty, 0);

				state.products.forEach((product: Product) => {
					if (discount.typeValue === 1) {
						discountValue = product.price * (discount.value / (sumPrice / 100) / 100);
						productDiscount.value = discountValue;
					}

					product.discount = {
						...productDiscount,
					};
				});
			}
		},

		delDiscountProduct(state, action) {
			const productCode = action.payload;

			if (state.products) {
				let product = state.products.find((p) => p.code === productCode);

				if (product) {
					delete product.discount;
				}
			}
		},

		setProductsDiscount(state, action) {
			let productCode = action.payload[0];
			let discount = action.payload[1];

			let product = null;

			if (state.productsDiscount) {
				product = state.productsDiscount.find((p) => p.productCode === productCode);
			}

			if (product) {
				product.sumDiscount = discount;
			} else {
				state.productsDiscount.push({
					productCode: productCode,
					sumDiscount: discount,
				});
			}
		},
	},
});

export default CartSlice.reducer;
