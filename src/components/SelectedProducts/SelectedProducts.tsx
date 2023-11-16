import { useEffect, useState } from "react";
import styles from "./SelectedProducts.module.scss";

// services
import { getSelectedProducts } from "@/services/selected-products";

// models
import { Product } from "@/models/products";

// components

import Modal from "@/ui-components/Modal/Modal";

const SelectedProducts = () => {
	const [selectedProducts, setSelectedProducts] = useState<Array<Product>>([]);
	const [topSelectedProducts, setTopSelectedProducts] = useState<Array<Product>>([]);
	const [stateModal, setStateModal] = useState<boolean>(false);
	const [listSelectedProducts, setListSelectedProducts] = useState<Array<any>>([]);

	useEffect(() => {
		getSelectedProducts().then((response: any) => {
			if (response) {
				setSelectedProducts(response);
				setTopSelectedProducts(response.slice(0, 4));
			}
		});
	}, []);

	function handlerStateModal(state: boolean) {
		setStateModal(state);
	}

	function handlerCompleteModal() {
		console.log(888);
	}

	function onAddProductToSelectedList(code: string) {
		const index = listSelectedProducts.findIndex((product) => product.code === code);

		if (index !== -1) {
			listSelectedProducts[index].quanty += 1;
			setListSelectedProducts([...listSelectedProducts]);
		} else {
			let initProduct = {
				code: code,
				quanty: 1,
			};

			setListSelectedProducts([...listSelectedProducts, initProduct]);
		}
	}

	return (
		<>
			{topSelectedProducts && (
				<div className={styles.selectedProducts}>
					<div className={styles.selectedProductsTopList}>
						{topSelectedProducts.map((product) => (
							<div className={styles.selectedProduct} key={product.code} data-code={product.code}>
								<div className={styles.selectedProductName}>{product.name}</div>
								<div className={styles.selectedProductPrice}>{product.price} &#8381;</div>
							</div>
						))}
					</div>
					<div className={styles.selectedProductsBtnAllProducts} onClick={() => handlerStateModal(true)}>
						Все товары
					</div>
				</div>
			)}

			<Modal onState={handlerStateModal} onComplete={handlerCompleteModal} state={stateModal} btnOkName="Добавить" title="Избранные товары">
				<div className={styles.selectedProductsAll}>
					<div className={styles.listProducts}>
						{selectedProducts.map((product) => (
							<div
								className={styles.selectedProduct}
								key={product.code}
								data-code={product.code}
								onClick={() => onAddProductToSelectedList(product.code)}
							>
								<div className={styles.selectedProductName}>{product.name}</div>
								<div className={styles.selectedProductPrice}>{product.price} &#8381;</div>
							</div>
						))}
					</div>
					<div className={styles.listSelected}>
						{listSelectedProducts.map((product) => (
							<div className={styles.product} key={product.code}>
								<p>code - {product.code}</p>
								<p>quanty - {product.quanty}</p>
							</div>
						))}
					</div>
				</div>
			</Modal>
		</>
	);
};

export default SelectedProducts;
