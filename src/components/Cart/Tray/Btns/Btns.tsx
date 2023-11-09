//store
import { CartSlice } from "@/store/reducers/CartSlice";
import { useAppDispatch } from "@/store/hooks/redux";
import { CartDiscountSlice } from "@/store/reducers/CartDiscountSlice";

import styles from "./Btns.module.scss";

//components
import { Link } from "react-router-dom";

// ui-components
import Button from "@/ui-components/Button/Button";
import ButtonIcon from "@/ui-components/ButtonIcon/ButtonIcon";

// images
import IconsTrash from "@/assets/img/icons/trash.svg";

const BtnsTrayProducts = () => {
	const { clearCart } = CartSlice.actions;
	const dispatch = useAppDispatch();

	const { show: showCartDiscount } = CartDiscountSlice.actions;

	return (
		<div className={styles.btnsTrayProductsList}>
			<Link to="/payment/" className={styles.btnPayment}>
				Оплата
			</Link>

			<Button onClick={() => dispatch(showCartDiscount())}>Скидка</Button>
			<ButtonIcon className={styles.btnClear} img={IconsTrash} event={() => dispatch(clearCart())}></ButtonIcon>
		</div>
	);
};

export default BtnsTrayProducts;
