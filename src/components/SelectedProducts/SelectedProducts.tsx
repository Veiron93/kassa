import styles from "./SelectedProducts.module.scss";

const SelectedProducts = () => {
	let selectedProducts = [
		{ id: 1, name: "Пакет белый", price: 5, count: 2, code: 23223232 },
		{ id: 2, name: "Стекло iPhone", price: 40, count: 1, code: 444444 },
		{ id: 3, name: "Чехол iPhone 14", price: 650, count: 1, code: 3232223 },
		{ id: 5, name: "Подставка для iPad", price: 700, count: 1, code: 2323232323 },
		{ id: 6, name: "Адаптер питания Kuulaa 20w C+A", price: 1200, count: 1, code: 444442232332 },
	];

	return (
		<div className={styles.selectedProducts}>
			<div className={styles.selectedProductsList}>
				{selectedProducts.map((product) => (
					<div className={styles.selectedProduct} key={product.id}>
						<div className={styles.selectedProductPrice}>{product.price} &#8381;</div>
						<div className={styles.selectedProductName}>{product.name}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default SelectedProducts;
