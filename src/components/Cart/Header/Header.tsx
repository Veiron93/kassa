import styles from "./Header.module.scss";

import { CartSlice } from "@/store/reducers/CartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";

import ButtonIcon from "@/ui-components/ButtonIcon/ButtonIcon";

// images
import IconsTrash from "@/assets/img/icons/trash.svg";

const Header = (props: any) => {
	// STORE
	const dispatch = useAppDispatch();

	//state
	const { products } = useAppSelector((state: any) => state.CartReducer);

	//actions
	const { clearCart } = CartSlice.actions;
	// --

	return (
		<div className={`${styles.cartHeader} ${props.className ? props.className : ""}`}>
			<div className={styles.countProducts}>Товаров: {products.length}</div>
			<ButtonIcon className={styles.btnClear} img={IconsTrash} event={() => dispatch(clearCart())}></ButtonIcon>
		</div>
	);
};

export default Header;
