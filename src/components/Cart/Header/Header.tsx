import styles from "./Header.module.scss";

// store
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { CartSlice } from "@/store/reducers/CartSlice";

// ui-components
import ButtonIcon from "@/ui-components/ButtonIcon/ButtonIcon";

// images
import IconsTrash from "@/assets/img/icons/trash.svg";

const Header = (props: any) => {
	// STORE
	const dispatch = useAppDispatch();

	//state
	const { products } = useAppSelector((state: any) => state.CartReducer);

	//actions
	const { clearCart, delDiscountCart } = CartSlice.actions;
	// --

	function onClearCart() {
		dispatch(clearCart());
		dispatch(delDiscountCart());
	}

	return (
		<div className={`${styles.cartHeader} ${props.className ? props.className : ""}`}>
			<div className={styles.countProducts}>Товаров: {products.length}</div>
			<ButtonIcon className={styles.btnClear} img={IconsTrash} event={() => onClearCart()}></ButtonIcon>
		</div>
	);
};

export default Header;
