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
	const { productsDiscount } = useAppSelector((state: any) => state.CartReducer);

	// actions
	const { onStateAddProducts, addDiscountProduct, delDiscountProduct } = CartSlice.actions;
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

	if (productsDiscount[product.code]) {
		discount.value = productsDiscount[product.code].value;
		discount.typeValue = productsDiscount[product.code].typeValue;
		discount.range = productsDiscount[product.code].range;
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

		onAddDiscountProduct();
	}

	function onAddDiscountProduct() {
		dispatch(addDiscountProduct({ productCode: product.code, discount: discount }));
		dispatch(hiddenDiscount());
	}

	function onDelDiscount() {
		dispatch(delDiscountProduct({ productCode: product.code }));
		dispatch(hiddenDiscount());
	}

	return (
		<>
			<div className={styles.productDiscount}>
				<div className={styles.productDiscountWrapper}>
					<div className={styles.productName}>{product.name}</div>

					{/* {productsDiscount && Object.keys(productsDiscount).length > 0 && <p>dwfewfewfw</p>} */}

					<div className={styles.form}>
						<input type="number" placeholder="Скидка" defaultValue={discount.value} onChange={onValueDiscount} />

						<div className={styles.typeValueDiscount}>
							<ButtonGroup btns={itemsTypeValueDiscount} activeItem={discount.typeValue} onChange={onTypeValueDiscount} />
						</div>
					</div>

					<div className={styles.rangeDiscount}>
						<ButtonGroup btns={itemsRangeDiscount} activeItem={discount.range} onChange={onRangeDiscount} />
					</div>

					{errorFormDiscount && <div className={styles.error}>{errorFormDiscount}</div>}

					<div className={styles.btns}>
						<Button onClick={validationFormDiscount}>ОК</Button>
						<Button onClick={() => dispatch(hiddenDiscount())}>Отмена</Button>
						<Button onClick={onDelDiscount}>Удалить</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductDiscount;
