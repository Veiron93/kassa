import { useEffect, useState, useRef } from "react";

import styles from "./Catalog.module.scss";

// models
import { ProductCart, Product, Category, ProductFavorite, CategoryFavorite, Favorite } from "@/models/catalog";

//store
import { useAppSelector, useAppDispatch } from "@/store/hooks/redux";

import { CartSlice } from "@/store/reducers/CartSlice";
import { CatalogSlice } from "@/store/reducers/CatalogSlice";

// services
import { getProduct, getCategory } from "@/services/catalog";

// components
import ProductCatalog from "@/components/Catalog/ProductCatalog/ProductCatalog";
import CategoryCatalog from "@/components/Catalog/CategoryCatalog/CategoryCatalog";

// ui-components
import Icons from "@/ui-components/Icons/Icons";
import Modal from "@/ui-components/Modal/Modal";
import catalog from "@/data/catalog";

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
	const { add, incrementQuantity } = CartSlice.actions;
	// --

	// раздел каталога
	const catalogSections = [
		{
			id: 1,
			code: "catalog",
			name: "Каталог",
			icon: Icons.catalog,
			className: styles.itemCatalog,
		},
		{
			id: 2,
			code: "favorites",
			name: "Избранное",
			icon: Icons.star,
			className: styles.itemFavorites,
		},
	];

	const [currentCatalogSectionId, setCurrentCatalogSectionId] = useState<number>(catalogSections[0].id);
	// --

	// переключение раздела каталога
	function selectCatalogSection(id: number) {
		if (id === currentCatalogSectionId) {
			handlerSelectCategory(null);
		}

		setCurrentCatalogSectionId(id);
	}

	// каталог
	const [itemsCatalog, setItemsCatalog] = useState<Array<Product[] | Category[]> | []>([]);
	const [currentCategory, setCurrenCategory] = useState<Category | null>();

	function handlerSelectCategory(categoryId: number | null = null) {
		let categories: Category[] = [];
		let products: Product[] = [];

		categories = catalog.categories.filter((category) => category.parentId === categoryId);
		products = catalog.products.filter((product) => product.categoryId === categoryId);

		// текущая категория
		if (categoryId) {
			let currentCategory = catalog.categories.find((category) => category.id === categoryId);
			setCurrenCategory(currentCategory);
		} else {
			setCurrenCategory(null);
		}

		setItemsCatalog([categories, products]);

		if (currentCatalogSectionId !== catalogSections[0].id) {
			selectCatalogSection(catalogSections[0].id);
		}
	}

	function backCatalog() {
		let idParentCategory = currentCategory ? currentCategory.parentId : null;
		handlerSelectCategory(idParentCategory);
	}

	useEffect(() => {
		handlerSelectCategory();
	}, []);

	// избранное
	const [itemsCatalogFavorites, setItemsCatalogFavorites] = useState<Array<ProductFavorite | CategoryFavorite | null> | []>([]);

	async function initGridFavorites() {
		let items: Array<ProductFavorite | CategoryFavorite> = [];
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

			if (item.type === 2) {
				getCategory(item.idItem).then((response) => {
					if (response) {
						let category: CategoryFavorite = {
							...response,
							position: item.position,
							type: item.type,
						};

						items.push(category);
					}
				});
			}
		}

		let quantityRows = Math.ceil(maxPosition / 5);

		let grid: Array<ProductFavorite | CategoryFavorite | null> = Array(quantityRows * 5).fill(null);

		for await (let item of items) {
			grid[item.position - 1] = item;
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
			dispatch(incrementQuantity(code));
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
				quantity: 1,
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

	// Продажа по свободной цене
	const [stateModalSaleFreePrice, setStateModalSaleFreePrice] = useState<boolean>(false);
	const [errorModalSaleFreePrice, setErrorModalSaleFreePrice] = useState<string | null>(null);

	const nameProductSaleFreePriceRef = useRef<HTMLInputElement | null>(null);
	const priceProductSaleFreePriceRef = useRef<HTMLInputElement | null>(null);

	function onSelectNameSaleFreePrice() {
		if (nameProductSaleFreePriceRef.current) {
			nameProductSaleFreePriceRef.current.select();
		}
	}

	function validationSaleFreePrice(): boolean {
		if (nameProductSaleFreePriceRef.current) {
			nameProductSaleFreePriceRef.current.value = nameProductSaleFreePriceRef.current.value.trim();

			if (nameProductSaleFreePriceRef.current.value.length === 0) {
				setErrorModalSaleFreePrice("Введите название");
				return false;
			}
		}

		if (priceProductSaleFreePriceRef.current) {
			if (priceProductSaleFreePriceRef.current.value.length === 0) {
				setErrorModalSaleFreePrice("Введите стоимость");
				return false;
			}
		}

		return true;
	}

	function handlerCompleteSaleFreePrice() {
		let validation = validationSaleFreePrice();

		if (!validation) {
			return null;
		}

		let code = "free-" + Date.now();

		let product: ProductCart = {
			id: null,
			code: code,
			name: nameProductSaleFreePriceRef.current ? nameProductSaleFreePriceRef.current.value : "",
			price: priceProductSaleFreePriceRef.current ? Number(priceProductSaleFreePriceRef.current.value) : 1,
			quantity: 1,
			leftover: 999,
		};

		dispatch(add(product));
		handlerStateSaleFreePrice(false);
	}

	function handlerStateSaleFreePrice(state: boolean) {
		setStateModalSaleFreePrice(state);
		setErrorModalSaleFreePrice(null);
	}
	// --

	return (
		<div className={styles.catalog}>
			<div className={styles.catalogHeader}>
				{catalogSections &&
					catalogSections.map((section) => (
						<div
							className={`${styles.catalogHeaderItem} ${section.className}`}
							key={section.code}
							onClick={() => selectCatalogSection(section.id)}
						>
							<img src={section.icon} />
							<span>{section.name}</span>
						</div>
					))}

				<div className={`${styles.catalogHeaderItem} ${styles.itemCatalogSaleFreePrice}`} onClick={() => setStateModalSaleFreePrice(true)}>
					<span>
						Продажа по <br /> свободной <br /> цене
					</span>
				</div>
			</div>

			{/* основной раздел */}
			{currentCatalogSectionId === 1 && itemsCatalog && (
				<div className={styles.catalogList}>
					{/* кнопка назад */}
					{currentCategory && (
						<div className={styles.currentCaregory} onClick={backCatalog}>
							<div className={styles.currentCaregoryName}>
								<img src={Icons.back} alt="" />
								<span>{currentCategory.name}</span>
							</div>

							<div className={styles.currentCaregoryInfo}>
								<div>
									<img src={Icons.catalog} />
									<span>{itemsCatalog[0].length}</span>
								</div>
								<div>|</div>
								<div>
									<img src={Icons.catalog} />
									<span>{itemsCatalog[1].length}</span>
								</div>
							</div>
						</div>
					)}

					{/* категории */}
					{itemsCatalog[0] &&
						itemsCatalog[0].map((item: any) => (
							<CategoryCatalog category={item} key={item.id} onClick={() => handlerSelectCategory(item.id)} />
						))}

					{/* товары */}
					{itemsCatalog[1] &&
						itemsCatalog[1].map((item: any) => <ProductCatalog product={item} key={item.id} onClick={handlerSelectProduct} />)}
				</div>
			)}

			{currentCatalogSectionId === 1 && itemsCatalog[0] && itemsCatalog[0].length === 0 && itemsCatalog[1] && itemsCatalog[1].length === 0 && (
				<p>пусто</p>
			)}

			{/* избранное */}
			{currentCatalogSectionId === 2 && (
				<div className={`${styles.favoritesList} ${styles.catalogList}`}>
					{itemsCatalogFavorites &&
						itemsCatalogFavorites.map((item: any, index) =>
							item && item.type === 1 ? (
								<ProductCatalog product={item} key={index} onClick={handlerSelectProduct} />
							) : item && item.type === 2 ? (
								<CategoryCatalog category={item} key={index} onClick={() => handlerSelectCategory(item.id)} />
							) : (
								<div className={styles.emptyCell} key={index}></div>
							)
						)}
				</div>
			)}

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

			{/* продажа по свободной цене */}
			<Modal
				onComplete={handlerCompleteSaleFreePrice}
				onState={handlerStateSaleFreePrice}
				state={stateModalSaleFreePrice}
				btnOkName="Добавить"
				error={errorModalSaleFreePrice}
				title="Продажа по свободной цене"
			>
				<div className={styles.saleFreePrice}>
					<div className={styles.saleFreePriceForm}>
						<div className={`${styles.nameProductSaleFreePrice} ${styles.formRow}`} onClick={onSelectNameSaleFreePrice}>
							<label>Название</label>
							<input ref={nameProductSaleFreePriceRef} type="text" defaultValue="Товар по свободной цене" />
						</div>

						<div className={`${styles.priceProductSaleFreePrice} ${styles.formRow}`}>
							<label htmlFor="priceProductSaleFreePrice">Стоимость</label>
							<input id="priceProductSaleFreePrice" ref={priceProductSaleFreePriceRef} type="number" />
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default Catalog;
