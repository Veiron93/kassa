import styles from "./StatusCart.module.scss";

const StatusCart = () => {
	return (
		<div className={styles.statusCart}>
			{/* <div className={styles.statusCartTitle}>Статус</div> */}
			<div className={`${styles.statusCartIndicator} ${styles.online}`}></div>
			<div className={styles.statusCartText}>Касса активна</div>
		</div>
	);
};

export default StatusCart;
