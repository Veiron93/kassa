import styles from "./Product.module.scss";

// components
import ButtonIcon from "../../../ui-components/ButtonIcon/ButtonIcon";

// images
import IconsTrash from "../../../assets/img/icons/trash.svg";

const ProductListGoods = (props) => {
	const product = props.product;

	return (
		<div className={styles.product} key={product.id}>
			<div className={styles.productName}>
				<span>{product.name}</span>
				<span>
					Код: <span>{product.code}</span>
				</span>
			</div>

			<div className={styles.productCount}>
				<button>-</button>
				<input type="number" value={product.quanty} readOnly />
				<button>+</button>
			</div>

			<div className={styles.productPrice}>
				<span>{product.price * product.quanty}</span>
				<span>
					{product.quanty} x {product.price}
				</span>
			</div>

			<ButtonIcon className={styles.productBtnDel} img={IconsTrash}></ButtonIcon>
		</div>
	);
};

export default ProductListGoods;
