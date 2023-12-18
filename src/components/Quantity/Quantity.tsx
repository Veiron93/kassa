import { useEffect, useState, useRef } from "react";

import styles from "./Quantity.module.scss";

interface Props {
	value: number;
	max?: number;
	onChange?: any;
	className?: string;
}

const Quantity = (props: Props) => {
	let maxQuantity = props.max ? props.max : null;
	let idTimeout: any = null;

	const inputQuantityRef = useRef<HTMLInputElement | null>(null);
	const [quantity, setQuantity] = useState<number | string>(props.value);
	const [init, setInit] = useState<boolean>(false);
	const [initExternalEvent, setInitExternalEvent] = useState<boolean>(false);
	const [callHandlerValue, setCallHandlerValue] = useState<boolean>(false);

	// изменение количества из вне компонента
	useEffect(() => {
		if (!initExternalEvent) {
			setInitExternalEvent(true);
		} else {
			setQuantity(props.value);
		}
	}, [props.value]);

	// изменение количества элемнтами компонента
	useEffect(() => {
		if (!init) {
			setInit(true);
		} else {
			if (quantity && callHandlerValue) {
				setCallHandlerValue(false);
				idTimeout = setTimeout(() => handlerValue(), 300);
				return () => clearTimeout(idTimeout);
			}
		}
	}, [quantity]);

	// изменение кнопками - и +
	function changeQuantityProduct(type: string) {
		let quantityValue = Number(quantity);

		if (type === "minus" && Number(quantity) > 1) {
			quantityValue = Number(quantity) - 1;
		}

		if (type === "plus" && (maxQuantity ? Number(quantity) < maxQuantity : true)) {
			quantityValue = Number(quantity) + 1;
		}

		setCallHandlerValue(true);
		setQuantity(quantityValue);
	}

	// ввод в ручную
	function manualQuantity(value: number) {
		let inputValue = maxQuantity && value > maxQuantity ? maxQuantity : value;
		setCallHandlerValue(true);
		setQuantity(inputValue);
	}

	function handlerValue() {
		props.onChange(Number(quantity));
	}

	function selectValueInputQuantity() {
		if (inputQuantityRef.current) {
			inputQuantityRef.current.select();
		}
	}

	return (
		<div className={`${styles.quantity} ${props.className ? props.className : ""}`}>
			<button onClick={() => changeQuantityProduct("minus")}>-</button>
			<input
				type="number"
				ref={inputQuantityRef}
				value={quantity}
				onFocus={() => selectValueInputQuantity()}
				onChange={(e: any) => manualQuantity(e.target.value)}
			/>
			<button onClick={() => changeQuantityProduct("plus")}>+</button>
		</div>
	);
};

export default Quantity;
