import { useAppDispatch } from "../../store/hooks/redux";
import { CodeProductSlice } from "../../store/reducers/CodeProductSlice";

import styles from "./NumericKeypad.module.scss";

const NumericKeypad = () => {
	//const { code } = useAppSelector((state: any) => state.CodeProductReducer);
	const { increment } = CodeProductSlice.actions;
	const dispatch = useAppDispatch();

	function getCodeKey(e: any) {
		const key = e.target.getAttribute("data-code-key");

		if (key === "enter") {
			console.log("товар добавлен");
		} else {
			dispatch(increment(key));
		}
	}

	const keys = [
		{ code: 7, text: "7" },
		{ code: 8, text: "8" },
		{ code: 9, text: "9" },
		{ code: 4, text: "4" },
		{ code: 5, text: "5" },
		{ code: 6, text: "6" },
		{ code: 1, text: "1" },
		{ code: 2, text: "2" },
		{ code: 3, text: "3" },
		{ code: 0, text: "0" },
		{ code: "enter", text: "Ввод" },
	];

	return (
		<div className={styles.NumericKeypad}>
			{keys.map((key) => (
				<div key={key.code} className={styles.NumericKeypadButton} data-code-key={key.code} onClick={getCodeKey}>
					{key.text}
				</div>
			))}
		</div>
	);
};

export default NumericKeypad;
