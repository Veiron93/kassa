import { createSlice } from "@reduxjs/toolkit";

// models
import { Discount, ProductCart } from "@/models/catalog";

interface CartState {
	products: Array<ProductCart> | null;
	stateAddProducts: boolean;
	productsDiscount: any;
	discountCart: Discount | null;
}

const initialState: CartState = {
	// список товаров
	// products: [
	// 	{
	// 		code: "6953156207295",
	// 		name: "Адаптер питания Baseus 30w (чёрный)",
	// 		price: 17700,
	// 		leftover: 10,
	// 		quanty: 2,
	// 	},
	// 	{
	// 		code: "6932172606222",
	// 		name: "Чехол iPhone 15 UGREEN",
	// 		price: 2300,
	// 		leftover: 2,
	// 		quanty: 1,
	// 	},

	// 	// {
	// 	// 	code: "6932172606909",
	// 	// 	name: "Адаптер питания Baseus 10.5w (чёрный)",
	// 	// 	price: 1200,
	// 	// 	leftover: 12,
	// 	// 	quanty: 3,
	// 	// },
	// ],

	products: [],

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
			if (state.products) {
				state.products = state.products.filter((product) => product.code !== action.payload);
			}
		},

		// изменить количество
		changeQuantity(state, action) {
			const codeProduct = action.payload.code;
			const quantity = action.payload.quantity;

			const product: ProductCart | undefined = state.products?.find((product: ProductCart) => product.code === codeProduct);

			if (product) {
				if (quantity > product.leftover) {
					product.quantity = product.leftover;
				} else {
					product.quantity = quantity;
				}
			}
		},

		incrementQuantity(state, action) {
			const codeProduct = action.payload;
			const product: ProductCart | undefined = state.products?.find((product: ProductCart) => product.code === codeProduct);

			if (product && product.quantity < product.leftover) {
				product.quantity = product.quantity + 1;
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

		// скидка "На весь заказ"
		addDiscountCart(state, action) {
			let discount = action.payload.discount;

			state.productsDiscount = {};
			state.discountCart = discount;

			if (state.products && state.products.length) {
				let discountUnit = 0;
				let discountRange = 2;

				const totalAmount = state.products.reduce((acc, product) => acc + product.price * product.quantity, 0);

				state.products.map((product) => {
					// рубли
					if (discount.typeValue === 1) {
						discountUnit = ((product.price * product.quantity) / totalAmount) * discount.value;
					}

					// проценты
					if (discount.typeValue === 2) {
						discountUnit = discount.value;
					}

					state.productsDiscount[product.code] = {
						value: discountUnit,
						typeValue: discount.typeValue,
						range: discountRange,
					};
				});
			}
		},

		// удаление скидки "На весь заказ"
		delDiscountCart(state) {
			state.discountCart = null;
			state.productsDiscount = {};
		},
	},
});

export default CartSlice.reducer;
