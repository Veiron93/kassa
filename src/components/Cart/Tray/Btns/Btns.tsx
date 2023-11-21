//store
import { CartSlice } from "@/store/reducers/CartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { CartDiscountSlice } from "@/store/reducers/CartDiscountSlice";

import styles from "./Btns.module.scss";

//components
import { Link } from "react-router-dom";

// ui-components
import Button from "@/ui-components/Button/Button";
import ButtonIcon from "@/ui-components/ButtonIcon/ButtonIcon";
import Icons from "@/ui-components/Icons/Icons";

// images
import IconsTrash from "@/assets/img/icons/trash.svg";

const BtnsTrayProducts = () => {
	// STORE
	const dispatch = useAppDispatch();

	//state
	const { discountCart } = useAppSelector((state: any) => state.CartReducer);

	//actions
	const { clearCart } = CartSlice.actions;
	const { show: showCartDiscount } = CartDiscountSlice.actions;

	return (
		<div className={styles.btnsTrayProductsList}>
			{/* <ButtonIcon className={styles.btnClear} img={IconsTrash} event={() => dispatch(clearCart())}></ButtonIcon> */}

			<Button onClick={() => dispatch(showCartDiscount())} className={`${styles.btnDiscount} ${discountCart && styles.active}`}>
				Скидка
			</Button>

			<div className={styles.btnPayment}>
				<Link to="/payment/" className={styles.btnPaymentOther}>
					<span>Оплата</span>
					<img src={Icons.moreWhite} alt="" />
				</Link>
				<Button className={styles.btnPaymentCard}>
					<img src={Icons.cardWhite} alt="" />
				</Button>
			</div>

			{/* <Link to="/payment/" className={styles.btnPayment}></Link> */}
		</div>
	);
};

export default BtnsTrayProducts;
