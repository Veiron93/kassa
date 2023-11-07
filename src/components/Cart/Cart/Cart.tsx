// import { useEffect, useState } from "react";

// import { recountPriceProducts } from "@/helpers/cart";

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
	//const { products } = useAppSelector((state: any) => state.CartReducer);

	// useEffect(() => {
	// 	//recountPriceProducts(products);
	// 	//console.log(products);
	// }, []);

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
