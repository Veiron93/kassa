import { useEffect, useState } from "react";

import styles from "./Product.module.scss";

// helpers
import { priceProduct } from "@/helpers/cart";

// models
import { ProductCart } from "@/models/catalog";

//store
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { CartSlice } from "@/store/reducers/CartSlice";
import { ProductDiscountSlice } from "@/store/reducers/ProductDiscountSlice";

// componetns
import Quantity from "@/components/Quantity/Quantity";

// ui-components
import Icons from "@/ui-components/Icons/Icons";

const CartProductsList = (props: any) => {
	// STORE
	const dispatch = useAppDispatch();

	// state
	const { productsDiscount, discountCart } = useAppSelector((state: any) => state.CartReducer);

	// actions
	const { changeQuantity, del, delDiscountProduct } = CartSlice.actions;
	const { show: showDiscount } = ProductDiscountSlice.actions;
	// --

	const product: ProductCart = props.product;
	const isFreePrice = product.code.split("-")[0] === "free" ? true : false;

	// QUANTITY PRODUCT
	function handlerQuantity(value: number) {
		dispatch(changeQuantity({ code: product.code, quantity: Number(value) }));
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
	const [discountSum, setDiscountSum] = useState<number>(0);

	useEffect(() => {
		if (productsDiscount[product.code]) {
			onRecountPrice(productsDiscount[product.code]);
		} else {
			onRecountPrice();
		}
	}, [product.quantity, productsDiscount]);

	function onRecountPrice(discount = null) {
		const recountResult = priceProduct(product, discount);

		setPriceProductTotal(Number(recountResult.priceProduct.toFixed(2)));
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
		<div id={"product-" + product.code} className={styles.product}>
			<div className={styles.productSectionTop}>
				<div className={styles.productName}>{product.name}</div>
			</div>

			<div className={styles.productSectionBottom}>
				<div className={styles.productBtnMore} onClick={() => onProductMore()}>
					<img src={Icons.moreWhite} alt="" />
				</div>

				<div className={styles.productPrice}>
					<div className={styles.productPrice__discount} onClick={() => !discountCart && dispatch(showDiscount(product))}>
						{discountSum ? <span>- {discountSum} р.</span> : <img src={Icons.discount} alt="" />}
					</div>

					<div className={styles.productPrice__total}>
						<span>{priceProductTotal} р</span>
					</div>
				</div>

				<Quantity className={styles.quantityProduct} value={product.quantity} max={product.leftover} onChange={handlerQuantity} />
			</div>

			{stateProductMore === true && (
				<div className={styles.productOtherWrapper}>
					<div className={styles.info}>
						{!isFreePrice && <p>Код: {product.code}</p>}
						{!isFreePrice && <p>Остаток: {product.leftover}</p>}
						{isFreePrice && <p>Свободная цена</p>}
						<p>Цена за 1 ед: {product.price}</p>
					</div>

					<div className={styles.btns}>
						<div className={styles.productBtnDel} onClick={onDelProduct}>
							<img src={Icons.trash} alt="" />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CartProductsList;
