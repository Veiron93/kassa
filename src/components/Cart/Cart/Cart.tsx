import useDeepCompareEffect from "use-deep-compare-effect";

// data
import productsData from "@/data/products";

// hooks
import { getCartLocalStore, setCartLocalStore } from "@/hooks/cartLocalStorage";

// components
import CartProductsList from "@/components/Cart/ProductsList/ProductsList";
import CartTray from "@/components/Cart/Tray/Tray";
import ProductDiscount from "@/components/Cart/ProductDiscount/ProductDiscount";
import Discount from "@/components/Cart/Discount/Discount";
import Header from "@/components/Cart/Header/Header";

//store
import { useAppSelector } from "@/store/hooks/redux";
import { useEffect, useState } from "react";

const Cart = () => {
	const { products, productsDiscount, discountCart } = useAppSelector((state: any) => state.CartReducer);

	const [initCart, setInitCart] = useState<boolean>(false);

	// инициализация корзины
	// function cartInit() {
	// 	if (initCart) {
	// 		setCartLocalStore(products, productsDiscount, discountCart);
	// 	}

	// 	setInitCart(true);

	// 	const cartLocalStorage = getCartLocalStore();
	// 	console.log(cartLocalStorage);

	// 	// const productsCartLocalStorage = [];
	// 	// if (cartLocalStorage && cartLocalStorage.products) {
	// 	// 	console.log(cartLocalStorage);
	// 	// }
	// }

	// cartInit();

	// инициализация корзины
	useEffect(() => {
		const cartLocalStorage = getCartLocalStore();

		if (cartLocalStorage && cartLocalStorage.products) {
			let codes: string[] = [];

			cartLocalStorage.products.forEach((product: any) => {
				codes.push(product.code);

				//console.log(codes.length);

				if (codes.length === cartLocalStorage.products.length) {
					// productsData.products.forEach(item=>{
					// 	if(item.code === ){
					// 	}
					// })
					// console.log(codes);
				}
			});

			//console.log(codes);

			//productsData.
		}
	}, []);

	// сохранение корзины в LocalStorage
	useDeepCompareEffect(() => {
		if (initCart) {
			setCartLocalStore(products, productsDiscount, discountCart);
		}

		setInitCart(true);
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
