import styles from "./StatusKassa.module.scss";

const StatusKassa = () => {
	return (
		<div className={styles.statusKassa}>
			{/* <div className={styles.statusCartTitle}>Статус</div> */}
			<div className={`${styles.statusKassaIndicator} ${styles.online}`}></div>
			<div className={styles.statusKassaText}>Онлайн</div>
		</div>
	);
};

export default StatusKassa;
