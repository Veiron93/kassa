import { useEffect, useState } from "react";
import styles from "./productDiscount.module.scss";

//store
import { useAppSelector, useAppDispatch } from "@/store/hooks/redux";
import { CartSlice } from "@/store/reducers/CartSlice";
import { ProductDiscountSlice } from "@/store/reducers/ProductDiscountSlice";

// ui-components
//import Button from "@/ui-components/Button/Button";
import ButtonGroup from "@/ui-components/ButtonGroup/ButtonGroup";
import Modal from "@/ui-components/Modal/Modal";

const ProductDiscount = () => {
	// store
	const dispatch = useAppDispatch();

	// state
	const { product, state: stateProductDiscount } = useAppSelector((state: any) => state.ProductDiscountReducer);
	const { productsDiscount } = useAppSelector((state: any) => state.CartReducer);

	// actions
	const { onStateAddProducts, addDiscountProduct, delDiscountProduct } = CartSlice.actions;
	const { hidden: hiddenProductDiscount } = ProductDiscountSlice.actions;

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

	const discount: any = {
		value: "" as number | string,
		typeValue: itemsTypeValueDiscount[0].value as number,
		range: itemsRangeDiscount[0].value as number,
	};

	if (product && productsDiscount[product.code]) {
		discount.value = productsDiscount[product.code].value;
		discount.typeValue = productsDiscount[product.code].typeValue;
		discount.range = productsDiscount[product.code].range;
	}

	// const [discountTypeValue, setDiscountTypeValue] = useState<number>(discount.typeValue);
	// const [discountRange, setDiscountRange] = useState<number>(discount.range);

	const [errorFormDiscount, setErrorFormDiscount] = useState<string | null>(null);
	const [textInform, setTextInform] = useState<string | null>("wdwd");

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

		if (discount.value >= maxDiscount) {
			setErrorFormDiscount("Скидка привышает максимально доступную");
			return false;
		}

		onAddDiscountProduct();
	}

	function onAddDiscountProduct() {
		dispatch(addDiscountProduct({ productCode: product.code, discount: discount }));
		dispatch(hiddenProductDiscount());
	}

	function onDelDiscount() {
		dispatch(delDiscountProduct({ productCode: product.code }));
		dispatch(hiddenProductDiscount());
	}

	function onStateModal(state: boolean) {
		if (!state) {
			dispatch(hiddenProductDiscount());
			setErrorFormDiscount(null);
		}
	}

	function handlerModalBnts(code: string) {
		if (code === "del") {
			onDelDiscount();
		}
	}

	// кнопки в Modal
	const [btns, setBtns] = useState<any>([{ name: "Удалить", code: "del", state: product && productsDiscount[product.code] ? true : false }]);

	useEffect(() => {
		let btnDelDiscountIndex = btns.findIndex((btn: any) => btn.code === "del");
		btns[btnDelDiscountIndex].state = product && productsDiscount[product.code] ? true : false;
		setBtns(btns);
	}, [product && productsDiscount[product.code]]);

	// максимальная скидка
	const [maxDiscount, setMaxDiscount] = useState<number>(0);

	useEffect(() => {
		if (product) {
			setMaxDiscount(product.price * product.quanty - 1);
		}
	}, [product]);

	return (
		<>
			<Modal
				state={stateProductDiscount}
				title={product && product.name + " - " + product.price + "руб."}
				btnOkName="Применить"
				description={"Максимальная скидка: " + maxDiscount + " руб."}
				onComplete={validationFormDiscount}
				onState={onStateModal}
				onCallbackBtns={handlerModalBnts}
				btns={btns}
			>
				<div className={styles.productDiscount}>
					<div className={styles.form}>
						<input type="number" placeholder="Скидка" defaultValue={discount.value} onChange={onValueDiscount} />

						<div className={styles.typeValueDiscount}>
							<ButtonGroup btns={itemsTypeValueDiscount} activeItem={discount.typeValue} onChange={onTypeValueDiscount} />
						</div>
					</div>

					<div className={styles.rangeDiscount}>
						<ButtonGroup btns={itemsRangeDiscount} activeItem={discount.range} onChange={onRangeDiscount} />
					</div>

					{/* <div className={styles.maxDiscount}>Максимальная скидка: {maxDiscount} &#8381;</div> */}

					{errorFormDiscount && <div className={styles.error}>{errorFormDiscount}</div>}
				</div>
			</Modal>
		</>
	);
};

export default ProductDiscount;
