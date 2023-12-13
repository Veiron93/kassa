import { useEffect, useState } from "react";
import styles from "./ProductCatalog.module.scss";

// models
import { Product } from "@/models/catalog";

interface propsProductCatalog {
	product: Product;
	className?: any;
	onClick?: any;
}

const ProductCatalog = (props: propsProductCatalog) => {
	// const [product, setProduct] = useState<Product | null>(null);

	// useEffect(()=>{

	// }, [])

	function handlerClick(product: Product) {
		props.onClick(product);
	}

	return (
		<div className={`${styles.productCatalog} ${props.className ? props.className : ""}`} onClick={() => handlerClick(props.product)}>
			<div className={styles.productCatalogName}>{props.product.name}</div>

			<div className={styles.productCatalogInfo}>
				<div className={styles.price}>{props.product.price} &#8381;</div>

				{props.product.skus ? (
					<div className={styles.productCatalogFlag}>{props.product.skus.length}</div>
				) : (
					<div className={styles.leftover}>{props.product.leftover} шт.</div>
				)}
			</div>
		</div>
	);
};

export default ProductCatalog;
