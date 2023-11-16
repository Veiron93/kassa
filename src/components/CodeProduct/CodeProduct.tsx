import { useAppSelector, useAppDispatch } from "../../store/hooks/redux";

import styles from "./CodeProduct.module.scss";

// store
import { CodeProductSlice } from "../../store/reducers/CodeProductSlice";

import NumericKeypad from "./../NumericKeypad/NumericKeypad";

const CodeProduct = () => {
	// STORE
	const dispatch = useAppDispatch();

	// state
	const { code, state: stateProductCode } = useAppSelector((state: any) => state.CodeProductReducer);

	// actions
	const { delSymbol, clearCode, state } = CodeProductSlice.actions;
	// --

	function onState(): void {
		dispatch(state(!stateProductCode));

		// при закрытии удаляем код товара
		if (!stateProductCode) {
			dispatch(clearCode());
		}
	}

	return (
		<div className={`${styles.CodeProduct} `}>
			{stateProductCode && (
				<div className={`${styles.CodeProductContent} `}>
					<div className={styles.CodeProductPreview}>
						<div className={styles.CodeProductPreviewNumber}>{code}</div>
						<div className={styles.CodeProductPreviewBtns}>
							<div className={styles.BtnDel} onClick={() => dispatch(delSymbol())}></div>
						</div>
					</div>

					<NumericKeypad className={styles.keypad} />
				</div>
			)}

			<div className={styles.CodeProductShow} onClick={() => onState()}>
				{stateProductCode ? "Отмена" : "Ввести код товара"}
			</div>
		</div>
	);
};

export default CodeProduct;
