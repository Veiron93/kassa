//store
import { useAppSelector, useAppDispatch } from "@/store/hooks/redux";
import { CartSlice } from "@/store/reducers/CartSlice";

import styles from "./Tray.module.scss";

// components
import Price from "./Price/Price";
import Btns from "./Btns/Btns";

const Tray = () => {
	const { products } = useAppSelector((state: any) => state.CartReducer);

	return (
		<div className={styles.trayProductList}>
			<Price />
			{products.length > 0 && <Btns />}
		</div>
	);
};

export default Tray;
