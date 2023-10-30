import { useEffect, useState } from "react";
import styles from "./productDiscount.module.scss";

//store
import { useAppSelector, useAppDispatch } from "@/store/hooks/redux";
import { CartSlice } from "@/store/reducers/CartSlice";
import { ProductDiscountSlice } from "@/store/reducers/ProductDiscountSlice";

// ui-components
import Button from "@/ui-components/Button/Button";
import ButtonGroup from "@/ui-components/ButtonGroup/ButtonGroup";

const ProductDiscount = () => {
	// store
	const dispatch = useAppDispatch();

	// state
	const { product } = useAppSelector((state: any) => state.ProductDiscountReducer);

	// actions
	const { onStateAddProducts, addDiscountProduct: cartAddDiscountProduct, delDiscountProduct: cartDelDiscountProduct } = CartSlice.actions;
	const { hidden: hiddenDiscount } = ProductDiscountSlice.actions;

	useEffect(() => {
		dispatch(onStateAddProducts(false));
	}, []);

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

	const itemsRangeDiscount = [
		{
			name: "На один",
			value: 1,
		},
		{
			name: "На каждый",
			value: 2,
		},
		{
			name: "Распределить",
			value: 3,
		},
	];

	const discount = {
		value: "" as number | string,
		typeValue: itemsTypeValueDiscount[0].value as number,
		range: itemsRangeDiscount[0].value as number,
	};

	if (product.discount) {
		discount.value = product.discount.value;
		discount.typeValue = product.discount.typeValue;
		discount.range = product.discount.range;
	}

	const [errorFormDiscount, setErrorFormDiscount] = useState<string | null>(null);

	function onValueDiscount(e: any) {
		const element = e.target;

		discount.value = Number(element.value);
	}

	function onTypeValueDiscount(value: number | null) {
		discount.typeValue = Number(value);
	}

	function onRangeDiscount(value: number | null) {
		discount.range = Number(value);
	}

	function validationFormDiscount(): void | boolean {
		if (discount.value === 0 || discount.value === null || discount.value === "") {
			setErrorFormDiscount("Введите скидку");
			return false;
		}

		addDiscountProduct();
		dispatch(hiddenDiscount());
	}

	function addDiscountProduct() {
		dispatch(cartAddDiscountProduct({ code: product.code, discount: discount }));
	}

	function delDiscount() {
		dispatch(cartDelDiscountProduct(product.code));
		dispatch(hiddenDiscount());
	}

	return (
		<>
			<div className={styles.productDiscount}>
				<div className={styles.productDiscountWrapper}>
					<div className={styles.productName}>{product.name}</div>

					<div className={styles.form}>
						<input type="number" placeholder="Скидка" defaultValue={discount.value} onChange={onValueDiscount} />

						<div className={styles.typeValueDiscount}>
							<ButtonGroup btns={itemsTypeValueDiscount} activeItem={discount.typeValue} onChange={onTypeValueDiscount} />
						</div>
					</div>

					<div className={styles.rangeDiscount}>
						<ButtonGroup btns={itemsRangeDiscount} activeItem={discount.range} onChange={onRangeDiscount} />
					</div>

					{/* <div className={styles.typeDiscount}></div> */}

					{errorFormDiscount && <div className={styles.error}>{errorFormDiscount}</div>}

					<div className={styles.btns}>
						<Button onClick={validationFormDiscount}>ОК</Button>
						<Button onClick={() => dispatch(hiddenDiscount())}>Отмена</Button>
						<Button onClick={delDiscount}>Удалить</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductDiscount;
