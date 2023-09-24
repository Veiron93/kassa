import { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../store/hooks/redux";
import { CodeProductSlice } from "../../store/reducers/CodeProductSlice";

import styles from "./CodeProduct.module.scss";

import NumericKeypad from "./../NumericKeypad/NumericKeypad";

const CodeProduct = () => {
	const { delSymbol, clearCode } = CodeProductSlice.actions;
	const dispatch = useAppDispatch();

	const { code } = useAppSelector((state: any) => state.CodeProductReducer);
	const [stateCodeProduct, setStateCodeProduct] = useState<boolean>(false);

	const stateNumericKeypad: any = (): void => {
		setStateCodeProduct(!stateCodeProduct);

		// при закрытии удаляем код товара
		if (stateCodeProduct === false) {
			dispatch(clearCode());
		}
	};

	return (
		<div className={`${styles.CodeProduct} `}>
			{stateCodeProduct && (
				<div className={`${styles.CodeProductContent} `}>
					<div className={styles.CodeProductPreview}>
						<div className={styles.CodeProductPreviewNumber}>{code}</div>
						<div className={styles.CodeProductPreviewBtns}>
							<div className={styles.BtnDel} onClick={() => dispatch(delSymbol())}></div>
						</div>
					</div>

					<NumericKeypad />
				</div>
			)}

			<div className={styles.CodeProductShow} onClick={() => stateNumericKeypad()}>
				{stateCodeProduct ? "Отмена" : "Ввести код товара"}
			</div>
		</div>
	);
};

export default CodeProduct;
