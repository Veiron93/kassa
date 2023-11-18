import { useEffect, useState } from "react";

import styles from "./ProductCard.module.scss";

// models
import { Product } from "@/models/products";

//store
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { CartSlice } from "@/store/reducers/CartSlice";
import { ProductDiscountSlice } from "@/store/reducers/ProductDiscountSlice";

const ProductCard = (props: any) => {
	const product: Product = props.product;

	// STORE
	const dispatch = useAppDispatch();

	// state
	const { productsDiscount, discountCart } = useAppSelector((state: any) => state.CartReducer);

	// actions
	const { changeQuanty, del, delDiscountProduct } = CartSlice.actions;
	const { show: showDiscount } = ProductDiscountSlice.actions;
	// --

	return (
		<div id={"product-card-" + product.code} className={styles.productCard} key={product.code}>
			<div className={styles.productCardName}>
				<span>{product.name}</span>
				<span>
					Код: <span>{product.code}</span>
				</span>
			</div>

			<div className={styles.productPrice}></div>
		</div>
	);
};

export default ProductCard;
