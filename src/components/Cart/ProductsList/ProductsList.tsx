import { useEffect } from "react";

//store
import { useAppSelector, useAppDispatch } from "@/store/hooks/redux";
import { CartSlice } from "@/store/reducers/CartSlice";

import styles from "./ProductsList.module.scss";

// components
import Product from "@/components/Cart/Product/Product";

const List = () => {
	// ТЕСТОВЫЕ ДАННЫЕ
	// db products
	let serverProducts = [
		{ id: 1, name: "Ремешок Apple Watch", price: 1500, leftover: 2, code: 1323322332 },
		{ id: 2, name: "Кейс Apple Watch", price: 450, leftover: 1, code: 32323323 },
		{ id: 3, name: "Чехол iPhone 14", price: 650, leftover: 1, code: 3232223 },
		{ id: 5, name: "Адаптер питания Baseus 30w (чёрный)", price: 700, leftover: 10, code: 6953156207295 },
		{ id: 6, name: "Адаптер питания Baseus 10.5w (чёрный)", price: 1200, leftover: 12, code: 6932172606909 },
	];

	// db discount cards
	let serverDiscountCards = [
		{ id: 1, name: "Скидка 20%", type: "percent", discount: 20 },
		{ id: 2, name: "Скидка 300 руб.", type: "fixed", discount: 300 },
	];

	// --

	// STORE
	const dispatch = useAppDispatch();

	// state
	const { products, stateAddProducts, discountCart } = useAppSelector((state: any) => state.CartReducer);

	// actions
	const { changeQuanty, add, addDiscountCart } = CartSlice.actions;

	// --

	useEffect(() => {
		if (discountCart) {
			dispatch(addDiscountCart({ discount: discountCart }));
		}
	}, [products]);

	// Отслеживает вставку кода со сканера
	useEffect(() => {
		window.addEventListener("keypress", initCode);
		return () => window.removeEventListener("keypress", initCode);
	}, []);

	// код нового товара
	let codeNewProduct: string = "";

	// инициализация кода товара
	function initCode(e: any): void {
		//console.log(stateAddProducts);

		if (stateAddProducts) {
			if (e.key !== "Enter") {
				codeNewProduct += e.key;
			} else if (e.key === "Enter" && codeNewProduct) {
				addProduct(Number(codeNewProduct));
				codeNewProduct = "";
			}
		}
	}

	/**
	 * добавляет товар в список
	 * @param {Number} code
	 * @returns {boolean | void}
	 */

	function addProduct(code: Number): boolean | void {
		let isAdded: Number = products.findIndex((product: any) => Number(product.code) === code);

		// если товар есть в списке, то увеличиваем его количество на 1
		if (isAdded !== -1) {
			dispatch(changeQuanty({ code: code, quanty: 1 }));
		}

		// если товара нет в списке, то добавляем
		if (isAdded === -1) {
			let newProduct: any = {};

			let product: Object | undefined = serverProducts.find((product) => product.code === code);

			if (product) {
				newProduct = Object.assign(product);
				newProduct.quanty = 1;
				dispatch(add(newProduct));
			} else {
				console.log("товар не найден в базе");
			}
		}
	}

	return (
		<div className={styles.productsList}>
			{products.map((product: any, index: number) => (
				<Product product={product} key={index} />
			))}
		</div>
	);
};

export default List;
