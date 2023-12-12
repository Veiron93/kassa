import { useEffect, useState } from "react";

import styles from "./Catalog.module.scss";

// models
import { ProductCart, Product } from "@/models/catalog";

//store
import { useAppSelector, useAppDispatch } from "@/store/hooks/redux";
import { CartSlice } from "@/store/reducers/CartSlice";
import { CatalogSlice } from "@/store/reducers/CatalogSlice";

// ui-components
import Icons from "@/ui-components/Icons/Icons";
import Modal from "@/ui-components/Modal/Modal";

const Catalog = () => {
	// STORE
	const dispatch = useAppDispatch();

	// state
	const { products: productsCart } = useAppSelector((state: any) => state.CartReducer);
	const {
		products: productsCatalog,
		categories: categoriesCatalog,
		favorites: favoritesCatalog,
	} = useAppSelector((state: any) => state.CatalogReducer);

	// actions
	const { add, incrementQuanty } = CartSlice.actions;
	// --

	const [stateSkusModal, setStateSkusModal] = useState<boolean>(false);
	const [selectedItem, setSelectedItem] = useState<any>(null);

	useEffect(() => {
		if (selectedItem) {
			if (selectedItem.skus) {
				setStateSkusModal(true);
			} else {
				onAddCart(selectedItem.code);
			}
		}
	}, [selectedItem]);

	function selectProduct(product: Product) {
		setSelectedItem(product);
	}

	// type (product | sku)
	function onAddCart(code: string, type = "product") {
		if (!selectedItem) {
			return false;
		}

		const isCart = productsCart.findIndex((product: any) => product.code === code);

		// если есть в корзине, то увеличиваем количество на 1
		if (isCart !== -1) {
			dispatch(incrementQuanty(code));
		}

		// добавляем товар в корзину
		if (isCart === -1) {
			let product: Product = selectedItem;

			if (type === "sku") {
				product = selectedItem.skus.find((sku: any) => sku.code === code);
			}

			let item: ProductCart = {
				name: product.name,
				code: product.code,
				quanty: 1,
				price: product.price,
				leftover: product.leftover,
			};

			dispatch(add(item));
		}

		if (type === "product") {
			setSelectedItem(null);
		}
	}

	function handlerCompleteModal() {
		setStateSkusModal(false);
		setSelectedItem(null);
	}

	return (
		<>
			<div className={styles.catalog}>
				<div className={styles.catalogType}>
					<img src={Icons.star} alt="" />
					<span>Избранное</span>
				</div>

				<div className={styles.catalogProductFreePrice}>
					{/* <img src={Icons.star} alt="" /> */}
					<span>Продажа по свободной цене</span>
				</div>

				{productsCatalog &&
					productsCatalog.map((product: any) => (
						<div className={styles.catalogProduct} key={product.code} onClick={() => selectProduct(product)}>
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
			</div>

			{/* SKUS */}
			<Modal onComplete={handlerCompleteModal} state={stateSkusModal} btnOkName="Готово" title="Артикулы" stateBtnCancel={false}>
				<div className={styles.catalogProductSkus}>
					<div className={styles.catalogProductSkusList}>
						{selectedItem &&
							selectedItem.skus &&
							selectedItem.skus.map((sku: any) => (
								<div className={styles.sku} key={sku.code} onClick={() => onAddCart(sku.code, "sku")}>
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
