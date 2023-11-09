import { useEffect, useState } from "react";

import styles from "./discount.module.scss";

// ui-components
import Button from "@/ui-components/Button/Button";
import ButtonGroup from "@/ui-components/ButtonGroup/ButtonGroup";

//store
import { useAppSelector, useAppDispatch } from "@/store/hooks/redux";
import { CartSlice } from "@/store/reducers/CartSlice";
import { CartDiscountSlice } from "@/store/reducers/CartDiscountSlice";

const Discount = () => {
	// store
	const dispatch = useAppDispatch();

	// state
	const { products, discountCart } = useAppSelector((state: any) => state.CartReducer);

	// actions
	const { onStateAddProducts, addDiscountCart, delDiscountCart } = CartSlice.actions;
	const { hidden: hiddenCartDiscount } = CartDiscountSlice.actions;

	// BUTTON GROUP
	const itemsTypeValueDiscount = [
		{
			name: "Рубли",
			value: 1,
		},
		{
			name: "Проценты",
			value: 2,
		},
	];

	const discount = {
		value: "" as number | string,
		typeValue: itemsTypeValueDiscount[0].value as number,
	};

	if (discountCart) {
		discount.value = discountCart.value;
		discount.typeValue = discountCart.typeValue;
	}

	const [errorFormDiscount, setErrorFormDiscount] = useState<string | null>(null);

	function onValueDiscount(e: any) {
		const element = e.target;

		discount.value = Number(element.value);
	}

	function onTypeValueDiscount(value: number | null) {
		discount.typeValue = Number(value);
	}

	function validationFormDiscount(): void | boolean {
		if (discount.value === 0 || discount.value === null || discount.value === "") {
			setErrorFormDiscount("Введите скидку");
			return false;
		}

		onAddDiscountCart();
		dispatch(hiddenCartDiscount());
	}

	function onAddDiscountCart() {
		dispatch(addDiscountCart({ discount: discount }));
	}

	function delCartDiscount() {
		dispatch(delDiscountCart());
		dispatch(hiddenCartDiscount());
	}

	return (
		<div className={styles.cartDiscount}>
			<div className={styles.cartDiscountWrapper}>
				<div className={styles.title}>Скидка</div>

				<div className={styles.cartDiscountDescription}>Скидка распределится между позициями</div>

				<div className={styles.sumDiscount}>
					<input type="number" placeholder="Скидка" defaultValue={discount.value} onChange={onValueDiscount} />

					<div className={styles.typeValueDiscount}>
						<ButtonGroup btns={itemsTypeValueDiscount} activeItem={discount.typeValue} onChange={onTypeValueDiscount} />
					</div>
				</div>

				{/* <div className={styles.codeDiscount}>
					<input type="number" placeholder="Код" defaultValue={discount.value} onChange={onValueDiscount} />
					<div className={styles.textInfo}>Промокод, сертификат, скидочная карта</div>
				</div> */}

				{errorFormDiscount && <div className={styles.error}>{errorFormDiscount}</div>}

				<div className={styles.btns}>
					<Button onClick={validationFormDiscount}>ОК</Button>
					<Button onClick={() => dispatch(hiddenCartDiscount())}>Отмена</Button>
					<Button onClick={delCartDiscount}>Удалить</Button>
				</div>
			</div>
		</div>
	);
};

export default Discount;
