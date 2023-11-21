import { useEffect, useState } from "react";

import styles from "./Product.module.scss";

// helpers
import { priceProduct } from "@/helpers/cart";

// models
import { Product } from "@/models/products";

//store
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { CartSlice } from "@/store/reducers/CartSlice";
import { ProductDiscountSlice } from "@/store/reducers/ProductDiscountSlice";

// componetns
import Quanty from "@/components/Quanty/Quanty";

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
	function handlerQuanty(value: number) {
		dispatch(changeQuanty({ code: product.code, quanty: Number(value) }));
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
	//const [unitPriceProduct, setUnitPriceProduct] = useState<number>(0);
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
		//setUnitPriceProduct(Number(recountResult.unitPriceProduct.toFixed(2)));
		setDiscountSum(Number(recountResult.discountSum.toFixed(2)));
	}
	// --

	// MORE
	const [stateProductMore, setStateProductMore] = useState<boolean>(false);

	function onProductMore(): void {
		setStateProductMore(!stateProductMore);
	}
	// --

	return (
		<div id={"product-" + product.code} className={styles.product} key={product.code}>
			<div className={styles.productSectionTop}>
				<div className={styles.productName}>{product.name}</div>
			</div>

			<div className={styles.productSectionBottom}>
				<div className={styles.productBtnMore} onClick={onProductMore}>
					<img src={Icons.moreWhite} alt="" />
				</div>

				<div className={styles.productPrice}>
					{/* <div className={styles.productPrice__unit}>{unitPriceProduct} / шт</div> */}

					<div className={styles.productPrice__discount} onClick={() => !discountCart && dispatch(showDiscount(product))}>
						{discountSum ? <span>- {discountSum} р.</span> : <img src={Icons.discount} alt="" />}
					</div>

					<div className={styles.productPrice__total}>
						{/* <span>{unitPriceProduct} шт. </span> */}
						<span>{priceProductTotal} р</span>
					</div>
				</div>

				<Quanty className={styles.quantyProduct} value={product.quanty} max={product.leftover} onChange={handlerQuanty} />

				{/* <div className={styles.productCode}>
					Код: <span>{product.code}</span>
				</div> */}

				{/* <div className={styles.productNumber}>1.</div> */}

				{/* <div className={styles.productBtnDel} onClick={onDelProduct}>
					<img src={Icons.trash} alt="" />
				</div> */}
			</div>

			{stateProductMore && (
				<div className={styles.productOtherWrapper}>
					<div className={styles.info}>
						<p>Код: {product.code}</p>
						<p>Остаток: {product.leftover}</p>
						<p>Цена: {product.price}</p>
					</div>

					<div className={styles.btns}>
						<div className={styles.productBtnDel} onClick={onDelProduct}>
							<img src={Icons.trash} alt="" />
						</div>
					</div>
				</div>
			)}

			{/* <div className={styles.productName}>
				<span>{product.name}</span>
				<span>
					Код: <span>{product.code}</span>
				</span>
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
			</div> */}
		</div>
	);
};

export default ProductListGoods;
