import { useState } from "react";

import styles from "./Catalog.module.scss";

// data
import products from "@/data/products";

// models
import { ProductCart } from "@/models/products";

//store
import { useAppSelector, useAppDispatch } from "@/store/hooks/redux";
import { CartSlice } from "@/store/reducers/CartSlice";

// components

// ui-components
import Icons from "@/ui-components/Icons/Icons";
import Modal from "@/ui-components/Modal/Modal";

const Catalog = () => {
	// STORE
	const dispatch = useAppDispatch();

	// state
	//const { products, stateAddProducts, discountCart } = useAppSelector((state: any) => state.CartReducer);

	// actions
	const { add } = CartSlice.actions;
	// --

	const [stateSkusModal, setStateSkusModal] = useState<boolean>(false);
	const [skusSelectedProduct, setSkusSelectedProduct] = useState<Array<any>>([]);

	function selectProduct(code: string) {
		const productIndex = products.products.findIndex((product: any) => product.code === code);
		const product = products.products[productIndex];

		if (product.skus) {
			setSkusSelectedProduct([...product.skus]);
			setStateSkusModal(true);
		}
	}

	function onAddProduct(code: string) {
		let sku: ProductCart | undefined = skusSelectedProduct.find((sku) => sku.code === code);

		// берем часть имени от родителя
		// если цена не указана, то берем стоимость родителя
		//

		if (sku) {
			let product: ProductCart;
			product = Object.assign(sku);
			product.quanty = 1;

			dispatch(add(product));
		}
	}

	return (
		<>
			<div className={styles.catalog}>
				<div className={styles.catalogType}>
					<img src={Icons.star} alt="" />
					<span>Избранное</span>
				</div>

				{products.products.map((product: any) => (
					<div className={styles.catalogProduct} key={product.code} onClick={() => selectProduct(product.code)}>
						<div className={styles.catalogProductName}>{product.name}</div>
						<div className={styles.catalogProductInfo}>
							<div className={styles.price}>{product.price} &#8381;</div>

							{product.skus ? (
								<div className={styles.catalogProductFlag}>{product.skus.length}</div>
							) : (
								<div className={styles.leftover}>{product.leftover} шт.</div>
							)}
						</div>
					</div>
				))}

				{/* <div className={styles.catalogCategory}></div> */}
			</div>

			{/* SKUS */}
			<Modal state={stateSkusModal}>
				<div className={styles.catalogProductSkus}>
					<div className={styles.catalogProductSkusList}>
						{skusSelectedProduct &&
							skusSelectedProduct.map((sku: any) => (
								<div className={styles.sku} key={sku.code} onClick={() => onAddProduct(sku.code)}>
									<div className={styles.skuName}>{sku.name}</div>
									<div className={styles.skuPrice}>{sku.price} р.</div>
									<div className={styles.skuLeftover}>{sku.leftover} шт.</div>
								</div>
							))}
					</div>
				</div>
			</Modal>
		</>
	);
};

export default Catalog;
