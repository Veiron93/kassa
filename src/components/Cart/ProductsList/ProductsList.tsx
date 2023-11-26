import { useEffect, useState } from "react";

// constxts
import { CartProductContext } from "@/contexts/CartProductContext";

// models
import { ProductCart } from "@/models/products";

// services
import { getProduct } from "@/services/products";

//store
import { useAppSelector, useAppDispatch } from "@/store/hooks/redux";
import { CartSlice } from "@/store/reducers/CartSlice";

import styles from "./ProductsList.module.scss";

// components
import Product from "@/components/Cart/Product/Product";

const List = () => {
	// STORE
	const dispatch = useAppDispatch();

	// state
	const { products, stateAddProducts, discountCart } = useAppSelector((state: any) => state.CartReducer);

	// actions
	const { add, addDiscountCart, incrementQuanty } = CartSlice.actions;
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
				addProduct(codeNewProduct);
				codeNewProduct = "";
			}
		}
	}

	/**
	 * добавляет товар в список
	 * @param {number} code
	 * @returns {void}
	 */

	function addProduct(code: string): void {
		// проверяем в store, а не в state
		let isAdded: number = products.findIndex((product: any) => product.code === code);

		// если товар есть в списке, то увеличиваем его количество на 1
		if (isAdded !== -1) {
			dispatch(incrementQuanty(code));
		}

		// если товара нет в списке, то добавляем
		if (isAdded === -1) {
			getProduct(code).then((response) => {
				if (response) {
					let product: ProductCart;
					product = Object.assign(response);
					product.quanty = 1;
					dispatch(add(product));
				} else {
					console.log("товар не найден в базе");
				}
			});
		}
	}

	// function getCartLocalStorage() {
	// 	const cartData = localStorage.get("cart-borsh");
	// 	return cartData ? JSON.parse(cartData) : null;
	// }

	// добавляет товар localStorage
	//function addProductCartLocalStorage(code: Number, quany: Number): boolean | void {}

	return (
		<div className={styles.productsList}>
			{products.map((product: any) => (
				// <CartProductContext.Provider value={currentProduct} key={product.code}></CartProductContext.Provider>
				<Product product={product} key={product.code} />
			))}
		</div>
	);
};

export default List;
