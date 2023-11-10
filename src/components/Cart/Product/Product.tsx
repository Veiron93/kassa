import { useEffect, useState } from "react";

import { priceProduct } from "@/helpers/cart";

import { Product } from "@/models/products";

import styles from "./product.module.scss";

//store
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { CartSlice } from "@/store/reducers/CartSlice";
import { ProductDiscountSlice } from "@/store/reducers/ProductDiscountSlice";

// ui-components
import Icons from "@/ui-components/Icons/Icons";

const ProductListGoods = (props: any) => {
	const product: Product = props.product;

	// STORE
	const dispatch = useAppDispatch();

	// state
	const { productsDiscount, discountCart } = useAppSelector((state: any) => state.CartReducer);

	// actions
	const { changeQuanty, del, delDiscountProduct } = CartSlice.actions;
	const { show: showDiscount } = ProductDiscountSlice.actions;

	// --

	// COUNT PRODUCT
	function changeQuantyProduct(type: string) {
		let quanty: number | null = null;

		if (type === "minus") quanty = -1;
		if (type === "plus") quanty = 1;

		// if (type === "manual") {
		// }

		dispatch(changeQuanty({ code: product.code, quanty: quanty, type: type }));
	}

	// --

	// DELETE PRODUCT
	function onDelProduct() {
		dispatch(del(product.code));
		dispatch(delDiscountProduct({ productCode: product.code }));
	}

	// --

	// PRICE
	const [priceProductTotal, setPriceProductTotal] = useState<number>(0);
	const [unitPriceProduct, setUnitPriceProduct] = useState<number>(0);
	const [discountSum, setDiscountSum] = useState<number>(0);

	useEffect(() => {
		if (productsDiscount[product.code]) {
			onRecountPrice(productsDiscount[product.code]);
		} else {
			onRecountPrice();
		}
	}, [product.quanty, productsDiscount]);

	function onRecountPrice(discount = null) {
		const recountResult = priceProduct(product, discount);

		setPriceProductTotal(Number(recountResult.priceProduct.toFixed(2)));
		setUnitPriceProduct(Number(recountResult.unitPriceProduct.toFixed(2)));
		setDiscountSum(Number(recountResult.discountSum.toFixed(2)));
	}

	// --

	return (
		<div id={"product-" + product.code} className={styles.product} key={product.code}>
			<div className={styles.productName}>
				<span>{product.name}</span>
				<span>
					Код: <span>{product.code}</span>
				</span>
			</div>

			<div className={styles.productCount}>
				<button onClick={() => changeQuantyProduct("minus")}>-</button>
				<div className={styles.productCountPreview}>{product.quanty}</div>
				<button onClick={() => changeQuantyProduct("plus")}>+</button>
			</div>

			<div className={styles.productPrice}>
				<div className={styles.productPrice__total}>{priceProductTotal}</div>
				<div className={styles.productPrice__unit}>{unitPriceProduct} / шт.</div>
			</div>

			<div className={styles.productBtns}>
				<div className={`${styles.productBtn} ${styles.productBtnDiscount}`} onClick={() => !discountCart && dispatch(showDiscount(product))}>
					{discountSum ? <span>- {discountSum} р.</span> : <img src={Icons.discount} alt="" />}
				</div>

				<div className={`${styles.productBtn} ${styles.productBtnDel}`} onClick={onDelProduct}>
					<img src={Icons.trash} alt="" />
				</div>
			</div>
		</div>
	);
};

export default ProductListGoods;
