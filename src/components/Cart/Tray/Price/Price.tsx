import { useEffect, useState } from "react";

import styles from "./Price.module.scss";

import { getDiscountCart } from "@/helpers/cart";

//store
import { useAppSelector } from "@/store/hooks/redux";

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
		setDiscount(getDiscountCart(productsDiscount, products));
	}, [productsDiscount]);

	return (
		<div className={styles.pricesTrayProductsList}>
			{/* <span className={styles.price}>Сумма: {sumPrice}</span> */}
			{/* {discount > 0 && <span className={styles.discount}>Скидка: - {discount}</span>} */}
			{/* <span className={styles.totalPrice}>Итого: {sumPrice - discount} р.</span> */}
			<span className={styles.totalPrice}>{sumPrice - discount} &#8381;</span>
		</div>
	);
};

export default Price;
