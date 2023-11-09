import { createSlice } from "@reduxjs/toolkit";

import { Discount, Product } from "@/modules/products";

interface CartState {
	products: Array<Product> | null;
	stateAddProducts: boolean;

	productsDiscount: any;

	discountCart: Discount | null;
}

const initialState: CartState = {
	// список товаров
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

	// возможность добавить товар (отслеживает на странице событие ввода)
	stateAddProducts: true,

	// товары со скидкой
	productsDiscount: {},

	// данные о скидке на весь заказ
	discountCart: null,
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
		clearCart(state) {
			state.products = [];
		},

		onStateAddProducts(state, action) {
			state.stateAddProducts = action.payload;
		},

		addDiscountProduct(state, action) {
			let productCode = action.payload.productCode;
			let discount = action.payload.discount;

			state.productsDiscount[productCode] = discount;
		},

		delDiscountProduct(state, action) {
			let productCode = action.payload.productCode;

			delete state.productsDiscount[productCode];
		},

		addDiscountCart(state, action) {
			let discount = action.payload.discount;

			state.discountCart = discount;

			if (state.products && state.products.length) {
				let discountUnit = 0;
				let discountRange = 2;

				// рубли
				if (discount.typeValue === 1) {
					const quantyProducts = state.products.reduce((sum, current) => sum + current.quanty, 0);
					discountUnit = discount.value / quantyProducts;
				}

				// проценты
				if (discount.typeValue === 2) {
					discountUnit = discount.value;
				}

				state.products.forEach((product) => {
					state.productsDiscount[product.code] = {
						value: discountUnit,
						typeValue: discount.typeValue,
						range: discountRange,
					};
				});
			}
		},

		delDiscountCart(state) {
			state.discountCart = null;
			state.productsDiscount = {};
		},
	},
});

export default CartSlice.reducer;
