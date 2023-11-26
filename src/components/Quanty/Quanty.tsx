import { useEffect, useState } from "react";

import styles from "./Quanty.module.scss";

interface Props {
	value: number;
	max?: number;
	onChange?: any;
	className?: string;
}

const Quanty = (props: Props) => {
	let maxQuanty = props.max ? props.max : null;
	let idTimeout: any = null;

	const [quanty, setQuanty] = useState<number | string>(props.value);
	const [init, setInit] = useState<boolean>(false);
	const [initExternalEvent, setInitExternalEvent] = useState<boolean>(false);
	const [callHandlerValue, setCallHandlerValue] = useState<boolean>(false);

	// изменение количества из вне компонента
	useEffect(() => {
		if (!initExternalEvent) {
			setInitExternalEvent(true);
		} else {
			setQuanty(props.value);
		}
	}, [props.value]);

	// изменение количества элемнтами компонента
	useEffect(() => {
		if (!init) {
			setInit(true);
		} else {
			if (quanty && callHandlerValue) {
				setCallHandlerValue(false);
				idTimeout = setTimeout(() => handlerValue(), 300);
				return () => clearTimeout(idTimeout);
			}
		}
	}, [quanty]);

	// изменение кнопками - и +
	function changeQuantyProduct(type: string) {
		let quantyValue = Number(quanty);

		if (type === "minus" && Number(quanty) > 1) {
			quantyValue = Number(quanty) - 1;
		}

		if (type === "plus" && (maxQuanty ? Number(quanty) < maxQuanty : true)) {
			quantyValue = Number(quanty) + 1;
		}

		setCallHandlerValue(true);
		setQuanty(quantyValue);
	}

	// ввод в ручную
	function manualQuanty(value: number) {
		let inputValue = maxQuanty && value > maxQuanty ? maxQuanty : value;
		setCallHandlerValue(true);
		setQuanty(inputValue);
	}

	function handlerValue() {
		props.onChange(Number(quanty));
	}

	return (
		<div className={`${styles.quanty} ${props.className ? props.className : ""}`}>
			<button onClick={() => changeQuantyProduct("minus")}>-</button>
			<input type="number" value={quanty} onChange={(e: any) => manualQuanty(e.target.value)} />
			<button onClick={() => changeQuantyProduct("plus")}>+</button>
		</div>
	);
};

export default Quanty;
