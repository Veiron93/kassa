import { useEffect, useState } from "react";

import styles from "./Catalog.module.scss";

// models
import { ProductCart, Product, Category, ProductFavorite, CategoryFavorite, Favorite } from "@/models/catalog";

//store
import { useAppSelector, useAppDispatch } from "@/store/hooks/redux";
import { CartSlice } from "@/store/reducers/CartSlice";
import { CatalogSlice } from "@/store/reducers/CatalogSlice";

// components
import ProductCatalog from "@/components/Catalog/ProductCatalog/ProductCatalog";
import CategoryCatalog from "@/components/Catalog/CategoryCatalog/CategoryCatalog";

// ui-components
import Icons from "@/ui-components/Icons/Icons";
import Modal from "@/ui-components/Modal/Modal";
import { getProduct } from "@/services/catalog";

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

	// раздел каталога
	const catalogSections = [
		{
			code: "catalog",
			name: "Каталог",
			icon: Icons.settings,
			className: styles.itemCatalog,
		},
		{
			code: "favorites",
			name: "Избранное",
			icon: Icons.star,
			className: styles.itemFavorites,
		},
	];

	const [catalogSection, setCatalogSection] = useState<string>(catalogSections[0].code);
	// --

	// избранное
	const [itemsCatalogFavorites, setItemsCatalogFavorites] = useState<Array<ProductFavorite | CategoryFavorite | null> | []>([]);

	async function initGridFavorites() {
		let items: Array<ProductFavorite> = [];
		let maxPosition = 1;

		for await (let item of favoritesCatalog) {
			if (item.position > maxPosition) maxPosition = item.position;

			if (item.type === 1) {
				getProduct(item.idItem).then((response) => {
					if (response) {
						let product: ProductFavorite = {
							...response,
							position: item.position,
							type: item.type,
						};

						items.push(product);
					}
				});
			}
		}

		let quantityRows = Math.ceil(maxPosition / 5);

		let grid: Array<ProductFavorite | CategoryFavorite | null> = Array(quantityRows * 5).fill(null);

		for await (let item of items) {
			grid[item.position] = item;
		}

		setItemsCatalogFavorites(grid);
	}

	useEffect(() => {
		if (favoritesCatalog.length > 0) {
			initGridFavorites();
		}
	}, [favoritesCatalog]);

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

	function handlerSelectProduct(product: Product) {
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
				id: product.id,
				name: product.name,
				code: product.code,
				categoryId: product.categoryId,
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
				<div className={styles.catalogHeader}>
					{catalogSections &&
						catalogSections.map((section) => (
							<div
								className={`${styles.catalogHeaderItem} ${section.className}`}
								key={section.code}
								onClick={() => setCatalogSection(section.code)}
							>
								<img src={section.icon} />
								<span>{section.name}</span>
							</div>
						))}

					<div className={`${styles.catalogHeaderItem} ${styles.itemCatalogSaleFreePrice}`}>
						<span>
							Продажа по <br /> свободной <br /> цене
						</span>
					</div>
				</div>

				{/* основной раздел */}
				{catalogSection === "catalog" && (
					<div className={styles.catalogList}>
						{productsCatalog &&
							productsCatalog.map((product: any) => (
								<ProductCatalog product={product} key={product.id} onClick={handlerSelectProduct} />
							))}
					</div>
				)}

				{/* избранное */}
				{catalogSection === "favorites" && (
					<div className={`${styles.favoritesList} ${styles.catalogList}`}>
						{itemsCatalogFavorites &&
							itemsCatalogFavorites.map((item: any) =>
								item && item.type === 1 ? (
									<ProductCatalog product={item} key={item.id} onClick={handlerSelectProduct} />
								) : item && item.type === 2 ? (
									<CategoryCatalog key={item.id} />
								) : (
									<div className={styles.emptyCell}></div>
								)
							)}
					</div>
				)}
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
