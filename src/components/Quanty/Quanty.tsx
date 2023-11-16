import { useEffect, useState } from "react";
import styles from "./Quanty.module.scss";

interface Props {
	value: number;
	max?: number;
	onChange?: any;
}

const Quanty = (props: Props) => {
	let maxQuanty = props.max ? props.max : null;
	let idTimeout: any = null;

	const [quanty, setQuanty] = useState<number | string>(props.value);

	function changeQuantyProduct(type: string) {
		if (type === "minus" && typeof quanty === "number" && quanty > 1) {
			setQuanty(quanty - 1);
		}
		if (type === "plus" && typeof quanty === "number" && (maxQuanty ? quanty < maxQuanty : true)) {
			setQuanty(quanty + 1);
		}
	}

	useEffect(() => {
		idTimeout = setTimeout(() => {
			handlerQuanty();
		}, 1500);

		return () => clearTimeout(idTimeout);
	}, [quanty]);

	function manualQuanty(value: number) {
		if (maxQuanty && value > maxQuanty) {
			setQuanty(maxQuanty);
		} else {
			setQuanty(value);
		}
	}

	function handlerQuanty() {
		props.onChange(quanty);
	}

	return (
		<div className={styles.quanty}>
			<button onClick={() => changeQuantyProduct("minus")}>-</button>
			<input type="number" value={quanty} onInput={(e: any) => manualQuanty(e.target.value)} />
			<button onClick={() => changeQuantyProduct("plus")}>+</button>
		</div>
	);
};

export default Quanty;
