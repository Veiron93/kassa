import { useEffect, useState } from "react";

import styles from "./Price.module.scss";

//store
import { useAppSelector, useAppDispatch } from "@/store/hooks/redux";

const Price = () => {
	// state
	const { products, productsDiscount } = useAppSelector((state: any) => state.CartReducer);

	// SUM PRICE
	const [sumPrice, setSumPrice] = useState(0);
	const [discount, setDiscount] = useState(0);

	// сумма товаров
	useEffect(() => {
		let sumPrice = products.reduce((sum: number, current: any) => sum + current.price * current.quanty, 0);
		setSumPrice(sumPrice);
	}, [products]);

	// скидка
	useEffect(() => {
		let discount = 0;

		if (productsDiscount.length) {
			discount = productsDiscount.reduce((sum: number, current: any) => sum + current.sumDiscount, 0);
		}

		setDiscount(discount);
	}, [productsDiscount]);

	return (
		<div className={styles.pricesTrayProductsList}>
			<span className={styles.price}>Сумма: {sumPrice} р.</span>
			{discount > 0 && <span className={styles.discount}>Скидка: - {discount} р.</span>}
			<span className={styles.totalPrice}>Итого: {sumPrice - discount} р.</span>
		</div>
	);
};

export default Price;
