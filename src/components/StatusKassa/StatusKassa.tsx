import styles from "./StatusKassa.module.scss";

//store
import { useAppSelector } from "@/store/hooks/redux";

const StatusKassa = () => {
	// STORE
	// state
	const { state } = useAppSelector((state: any) => state.ModeReducer);
	// --

	return (
		<div className={styles.statusKassa}>
			{/* <div className={styles.statusCartTitle}>Статус</div> */}
			<div className={`${styles.statusKassaIndicator} ${state ? styles.online : styles.offline}`}></div>
			<div className={styles.statusKassaText}>{state ? "Онлайн" : "Оффлайн"}</div>
		</div>
	);
};

export default StatusKassa;
