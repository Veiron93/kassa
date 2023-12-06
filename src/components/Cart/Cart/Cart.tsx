import useDeepCompareEffect from "use-deep-compare-effect";

// hooks
import { setCartLocalStore } from "@/hooks/cartLocalStorage";

// components
import CartProductsList from "@/components/Cart/ProductsList/ProductsList";
import CartTray from "@/components/Cart/Tray/Tray";
import ProductDiscount from "@/components/Cart/ProductDiscount/ProductDiscount";
import Discount from "@/components/Cart/Discount/Discount";
import Header from "@/components/Cart/Header/Header";

//store
import { useAppSelector } from "@/store/hooks/redux";

const Cart = () => {
	const { products, productsDiscount, discountCart } = useAppSelector((state: any) => state.CartReducer);

	// сохранение корзины в LocalStorage
	useDeepCompareEffect(() => {
		setCartLocalStore(products, productsDiscount, discountCart);
	}, [products, productsDiscount, discountCart]);

	return (
		<>
			{/* шапка корзины */}
			{products.length > 0 && <Header />}

			{/* список товаров */}
			<CartProductsList />

			{products.length > 0 && (
				<>
					{/* трей  */}
					<CartTray />

					{/* скидка на товар */}
					<ProductDiscount />

					{/* скидка на весь заказ */}
					<Discount />
				</>
			)}
		</>
	);
};

export default Cart;
