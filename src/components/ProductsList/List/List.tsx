import { useState, useEffect } from "react";

import styles from "./List.module.scss";

// components
import Product from "../Product/Product";

const List = () => {
	// ТЕСТОВЫЕ ДАННЫЕ - старт
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

	// ТЕСТОВЫЕ ДАННЫЕ - конец

	// Отслеживает вставку кода со сканера
	useEffect(() => {
		window.addEventListener("keypress", initCode);

		return () => {
			window.removeEventListener("keypress", initCode);
		};
	});

	// список товаров
	//const [productsList, setProductsList] = useState<Array<any>>([]);
	const [productsList, setProductsList] = useState<Array<any>>([...serverProducts]);

	// код нового товара
	let newProductCode: any = "";

	// инициализация кода товара
	function initCode(e: any): void {
		if (e.key !== "Enter") {
			newProductCode += e.key;
		} else {
			addNewProduct(Number(newProductCode));
			newProductCode = "";
		}
	}

	/**
	 * добавляет товар в список
	 * @param {Number} code
	 * @returns {boolean | void}
	 */

	function addNewProduct(code: Number): boolean | void {
		// получение товара из базы
		let product: Object | undefined = serverProducts.find((product) => product.code === code);

		if (!product) {
			return false;
		}

		// проверка, существет ли товар уже в списке товаров
		let isAdded: Number = productsList.findIndex((product: any) => Number(product.code) === code);

		// если товара нет в списке, то добавляем
		if (isAdded === -1) {
			// создаем новый объект с дополнительными свойствами и добавляем в список товаров
			let addedProduct: any = Object.assign(product, { quanty: 1 });

			setProductsList([...productsList, addedProduct]);
		}

		// если товар есть в списке, то увеличиваем его количество на 1
		if (isAdded !== -1) {
			changeQuantyProduct(code, 1);
		}
	}

	/**
	 * изменяет количество товаров в списке
	 * @param {Number} code
	 * @param {Number} quanty
	 * @returns {void}
	 */
	function changeQuantyProduct(code: Number, quanty: Number): void {
		let productIndex = productsList.findIndex((product: any) => Number(product.code) === code);

		productsList[productIndex].quanty += quanty;

		setProductsList([...productsList]);
	}

	/**
	 * сумма товаров в списке
	 * @param {Number} code
	 * @param {Number} quanty
	 * @returns {void}
	 */
	function getTotalPrice(code: Number, quanty: Number): void {
		let productIndex = productsList.findIndex((product: any) => Number(product.code) === code);

		productsList[productIndex].quanty += quanty;

		setProductsList([...productsList]);
	}

	return (
		<div className={styles.productList}>
			{productsList.map((product) => (
				<Product product={product} key={product.id} />
			))}
		</div>
	);
};

export default List;
