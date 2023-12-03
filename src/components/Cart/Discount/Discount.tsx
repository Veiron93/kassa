import { useState } from "react";

import styles from "./discount.module.scss";

// ui-components
import ButtonGroup from "@/ui-components/ButtonGroup/ButtonGroup";
import Modal from "@/ui-components/Modal/Modal";

//store
import { useAppSelector, useAppDispatch } from "@/store/hooks/redux";
import { CartSlice } from "@/store/reducers/CartSlice";
import { CartDiscountSlice } from "@/store/reducers/CartDiscountSlice";

const Discount = () => {
	// store
	const dispatch = useAppDispatch();

	// state
	const { discountCart } = useAppSelector((state: any) => state.CartReducer);
	const { state: stateCartDiscount } = useAppSelector((state: any) => state.CartDiscountReducer);

	// actions
	const { addDiscountCart, delDiscountCart } = CartSlice.actions;
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

	function validationFormDiscount(): void | null {
		if (discount.value === 0 || discount.value === null || discount.value === "") {
			setErrorFormDiscount("Введите скидку");
			return null;
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

	function onStateModal(state: boolean) {
		if (!state) {
			dispatch(hiddenCartDiscount());
			setErrorFormDiscount(null);
		}
	}

	function handlerModalBnts(code: string) {
		if (code === "del") {
			delCartDiscount();
		}
	}

	// кнопки в Modal
	const btns = [{ name: "Удалить", code: "del" }];

	return (
		<>
			<Modal
				state={stateCartDiscount}
				title="Скидка"
				description="Скидка распределится между позициями"
				btnOkName="Применить"
				onComplete={validationFormDiscount}
				onState={onStateModal}
				onCallbackBtns={handlerModalBnts}
				btns={btns}
			>
				<div className={styles.cartDiscount}>
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
				</div>
			</Modal>
		</>
	);
};

export default Discount;
