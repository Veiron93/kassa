import { useEffect, useState } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";

//store
import { useAppSelector, useAppDispatch } from "@/store/hooks/redux";

import { CartSlice } from "@/store/reducers/CartSlice";
import { CatalogSlice } from "@/store/reducers/CatalogSlice";

// models
import { Product, ProductCart } from "@/models/catalog";

// hooks
import { getCartLocalStore, setCartLocalStore } from "@/hooks/cartLocalStorage";

// components
import CartProductsList from "@/components/Cart/ProductsList/ProductsList";
import CartTray from "@/components/Cart/Tray/Tray";
import ProductDiscount from "@/components/Cart/ProductDiscount/ProductDiscount";
import Discount from "@/components/Cart/Discount/Discount";
import Header from "@/components/Cart/Header/Header";

const Cart = () => {
	// STORE
	const dispatch = useAppDispatch();

	// state
	const { products: productsCart, productsDiscount, discountCart } = useAppSelector((state: any) => state.CartReducer);
	const { products: productsCatalog } = useAppSelector((state: any) => state.CatalogReducer);

	// actions
	const { add, addDiscountProduct, addDiscountCart } = CartSlice.actions;
	// --

	// инициализация товаров в корзине
	const [initCart, setInitCart] = useState<boolean>(false);

	useEffect(() => {
		if (productsCatalog.length > 0 && !initCart) {
			const cartLocalStorage = getCartLocalStore();

			// товары
			if (cartLocalStorage && cartLocalStorage.products) {
				for (let productCart of cartLocalStorage.products) {
					let product = productsCatalog.find((product: Product) => product.code === productCart.code);

					if (product) {
						let item: ProductCart = {
							id: product.id,
							name: product.name,
							code: product.code,
							categoryId: product.categoryId,
							quantity: productCart.quantity,
							price: product.price,
							leftover: product.leftover,
						};

						dispatch(add(item));
					}
				}
			}

			// скидка на товары
			if (cartLocalStorage && Object.keys(cartLocalStorage.discountProducts)) {
				for (let discountProduct in cartLocalStorage.discountProducts) {
					dispatch(addDiscountProduct({ productCode: discountProduct, discount: cartLocalStorage.discountProducts[discountProduct] }));
				}
			}

			// скидка на весь заказ
			if (cartLocalStorage && cartLocalStorage.discount) {
				dispatch(addDiscountCart({ discount: cartLocalStorage.discount }));
			}

			setInitCart(true);
		}

		// после инициализации вызвать метод слежения Изменить init слежения
	}, [productsCatalog]);

	// следит за изменениями в корзине
	const [initWatchChangeCart, setInitWatchChangeCart] = useState<boolean>(false);

	// useDeepCompareEffect(() => {
	// 	if (initWatchChangeCart) {
	// 		setCartLocalStore(productsCart, productsDiscount, discountCart);
	// 	}
	// 	setInitWatchChangeCart(true);
	// }, [productsCart, productsDiscount, discountCart]);

	return (
		<>
			{/* шапка корзины */}
			{productsCart.length > 0 && <Header />}

			{/* список товаров */}
			<CartProductsList />

			{productsCart.length > 0 && (
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
