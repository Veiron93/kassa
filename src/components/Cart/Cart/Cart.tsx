// components
import CartProductsList from "@/components/Cart/ProductsList/ProductsList";
import CartTray from "@/components/Cart/Tray/Tray";
import ProductDiscount from "@/components/Cart/ProductDiscount/ProductDiscount";
import Discount from "@/components/Cart/Discount/Discount";

//store
import { useAppSelector } from "@/store/hooks/redux";

const Cart = () => {
	const { state: stateProductDiscount } = useAppSelector((state: any) => state.ProductDiscountReducer);
	const { state: stateCartDiscount } = useAppSelector((state: any) => state.CartDiscountReducer);

	return (
		<>
			<CartProductsList />
			<CartTray />
			{stateProductDiscount && <ProductDiscount />}
			{stateCartDiscount && <Discount />}
		</>
	);
};

export default Cart;
