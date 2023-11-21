// components
import CartProductsList from "@/components/Cart/ProductsList/ProductsList";
import CartTray from "@/components/Cart/Tray/Tray";
import ProductDiscount from "@/components/Cart/ProductDiscount/ProductDiscount";
import Discount from "@/components/Cart/Discount/Discount";
import Header from "@/components/Cart/Header/Header";

//store
import { useAppSelector } from "@/store/hooks/redux";

const Cart = () => {
	const { products } = useAppSelector((state: any) => state.CartReducer);

	const { state: stateProductDiscount } = useAppSelector((state: any) => state.ProductDiscountReducer);
	const { state: stateCartDiscount } = useAppSelector((state: any) => state.CartDiscountReducer);

	return (
		<>
			{products.length > 0 && <Header />}
			<CartProductsList />
			{products.length > 0 && <CartTray />}
			{products.length > 0 && stateProductDiscount && <ProductDiscount />}
			{products.length > 0 && stateCartDiscount && <Discount />}
		</>
	);
};

export default Cart;
