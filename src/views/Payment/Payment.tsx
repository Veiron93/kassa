import { useNavigate, Link } from "react-router-dom";

//store
import { useAppSelector, useAppDispatch } from "@/store/hooks/redux";

import styles from "./payment.module.scss";

// ui-components
import Button from "@/ui-components/Button/Button";

const Payment = () => {
	const navigate = useNavigate();

	const { products } = useAppSelector((state: any) => state.ListProductsReducer);

	let paymentMethod = null;

	function onPayOrder(typePay: string) {
		console.log(typePay);

		navigate("/payment/result");
	}

	return (
		<div className={styles.payment}>
			<div className={styles.paymentProductsList}>
				{products.map((product: any, index: number) => (
					<div className={styles.product} key={index}>
						<div className={styles.productName}>{product.name}</div>
					</div>
				))}
			</div>

			<div className={styles.paymentMethod}>
				<div className={styles.paymentMethodTitle}>Способ оплаты</div>
				<div className={styles.paymentMethodList}>
					<Button className={styles.btnClear} onClick={() => onPayOrder("card")}>
						Картой
					</Button>
					<Button className={styles.btnClear} onClick={() => onPayOrder("cash")}>
						Наличными
					</Button>
					<Button className={styles.btnClear} onClick={() => onPayOrder("deferred")}>
						Отложенный платёж
					</Button>
				</div>
			</div>

			<div className={styles.paymentFooter}>
				<Link to="/" className={styles.btnCancel}>
					Отмена
				</Link>
			</div>
		</div>
	);
};

export default Payment;
