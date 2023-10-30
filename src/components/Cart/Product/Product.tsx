import { useEffect, useState } from "react";

import { Product } from "@/modules/products";

import styles from "./product.module.scss";

//store
import { useAppDispatch } from "@/store/hooks/redux";
import { CartSlice } from "@/store/reducers/CartSlice";
import { ProductDiscountSlice } from "@/store/reducers/ProductDiscountSlice";

// ui-components
import Icons from "@/ui-components/Icons/Icons";

const ProductListGoods = (props: any) => {
	const product: Product = props.product;

	// COUNT PRODUCT
	const { changeQuanty, del, setProductsDiscount } = CartSlice.actions;
	const dispatch = useAppDispatch();

	function changeQuantyProduct(type: string) {
		let quanty: number | null = null;

		if (type === "minus") {
			quanty = -1;
		}

		if (type === "plus") {
			quanty = 1;
		}

		if (type === "manual") {
		}

		dispatch(changeQuanty({ code: product.code, quanty: quanty, type: type }));
	}

	// PRICE
	const { show: showDiscount } = ProductDiscountSlice.actions;

	const [priceProductTotal, setPriceProductTotal] = useState<number>(0);
	const [unitPriceProduct, setUnitPriceProduct] = useState<number>(0);
	const [discountSum, setDiscountSum] = useState<number>(0);

	useEffect(() => {
		recountProductPrice();
	}, [product.quanty, product.discount]);

	function recountProductPrice() {
		let priceProduct: number = 0;
		let unitPriceProduct: number = 0;
		let discountSum: number = 0;

		let valueDiscount: number = 0;
		let typeValueDiscount: number | null = null;
		let rangeDiscount: number | null = null;

		const discount = product.discount;

		if (discount && product.discount) {
			valueDiscount = product.discount.value;
			typeValueDiscount = product.discount.typeValue;
			rangeDiscount = product.discount.range;
		} else {
			priceProduct = product.price * product.quanty;
			unitPriceProduct = product.price;
		}

		// скидка в рублях
		if (typeValueDiscount === 1) {
			// на один товар
			if (rangeDiscount === 1) {
				let x = product.price - valueDiscount;
				let x2 = product.price * (product.quanty - 1);

				priceProduct = x + x2;
				unitPriceProduct = product.price - valueDiscount / product.quanty;
				discountSum = valueDiscount;
			}

			// на каждый товар
			if (rangeDiscount === 2) {
				let x = valueDiscount * product.quanty;

				priceProduct = product.price * product.quanty - x;
				unitPriceProduct = product.price - valueDiscount;
				discountSum = x;
			}

			// распределение скидки на всё количество
			if (rangeDiscount === 3) {
				priceProduct = product.price * product.quanty - valueDiscount;
				unitPriceProduct = product.price - valueDiscount / product.quanty;
				discountSum = valueDiscount;
			}
		}

		// скидка в процентах
		if (typeValueDiscount === 2) {
			// на один товар
			if (rangeDiscount === 1) {
				let x = (product.price / 100) * valueDiscount;
				let x2 = product.price * product.quanty;

				priceProduct = x2 - x;
				unitPriceProduct = (product.price * product.quanty - x) / product.quanty;
				discountSum = x;
			}

			// на каждый товар
			if (rangeDiscount === 2) {
				let x = (product.price / 100) * valueDiscount;
				let x2 = product.quanty * x;

				priceProduct = product.price * product.quanty - x2;
				unitPriceProduct = product.price - x;
				discountSum = x * product.quanty;
			}

			// распределение скидки на всё количество
			if (rangeDiscount === 3) {
				let x = (product.price / 100) * valueDiscount;

				priceProduct = (product.price - x) * product.quanty;
				unitPriceProduct = product.price - x;
				discountSum = x * product.quanty;
			}
		}

		if (discountSum) {
			dispatch(setProductsDiscount([product.code, discountSum]));
		}

		setPriceProductTotal(priceProduct);
		setUnitPriceProduct(Number(unitPriceProduct.toFixed(2)));
		setDiscountSum(discountSum);
	}

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
				<div className={`${styles.productBtn} ${styles.productBtnDiscount}`} onClick={() => dispatch(showDiscount(product))}>
					{discountSum ? <span>- {discountSum} р.</span> : <img src={Icons.discount} alt="" />}
				</div>

				<div className={`${styles.productBtn} ${styles.productBtnDel}`} onClick={() => dispatch(del(product.code))}>
					<img src={Icons.trash} alt="" />
				</div>
			</div>
		</div>
	);
};

export default ProductListGoods;
