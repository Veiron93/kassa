import { useState, useEffect } from "react";

import styles from "./OrderInfo.module.scss";

// ui-components
import Button from "./../../ui-components/Button/Button";
import ButtonIcon from "./../../ui-components/ButtonIcon/ButtonIcon";

// images
import IconsTrash from "./../../assets/img/icons/trash.svg";

const OrderInfo = () => {
	// Информация по списку товаров
	const [priceProductList, setPriceProductList] = useState<number>(0);
	const [discountProductList, setDiscountProductList] = useState<number | null>(null);
	const [totalPriceProductList, setTotalPriceProductList] = useState<number>(0);

	return (
		<div className={styles.OrderInfo}>
			<div className={styles.OrderInfoPrices}>
				<span className={styles.price}>Сумма: {priceProductList} р.</span>
				{discountProductList && <span className={styles.discount}>Скидка: -{discountProductList} р.</span>}
				<span className={styles.totalPrice}>Итого: {totalPriceProductList} р.</span>
			</div>

			<div className={styles.productListBtns}>
				<Button className={styles.btnPayment}>Оплата</Button>
				<ButtonIcon className={styles.btnClear} img={IconsTrash}></ButtonIcon>
			</div>
		</div>
	);
};

export default OrderInfo;
